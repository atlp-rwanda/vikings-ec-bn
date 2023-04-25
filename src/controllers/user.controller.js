import { UserService } from '../services/user.service.js';
import { saveTokens } from '../services/token.service.js';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { JwtUtility } from '../utils/jwt.util.js';
import { sendEmail } from '../utils/sendEmail.util';
import { resetPasswordTemplate } from '../utils/mailTemplates.util.js';
import { emailConfig } from '../utils/mail.util';
import { verifyEmailTemplate } from '../utils/mailTemplates.util.js';
import dotenv from 'dotenv';
dotenv.config();
import { uploadPhoto } from '../utils/cloudinary.util.js';
import { knownSchedulingTime, schedule } from '../utils/scheduling.util';
import {
  addDurationOnDate,
  durationToCronRepetition,
} from '../utils/date.util';
import { eventEmit, knownEvents, subscribe } from '../utils/events.util';
import { knownNotificationType } from '../services/notification.service';

const repetitionDuration = process.env.CRON_PERIOD
  ? durationToCronRepetition(process.env.CRON_PERIOD)
  : knownSchedulingTime.everySecond;
schedule(repetitionDuration, async () => {
  const now = new Date();
  const users = await UserService.findAll();
  users.forEach((eachUser) => {
    const lastTimePasswordUpdated = eachUser.lastTimePasswordUpdated;
    let checkList =
      !!lastTimePasswordUpdated && eachUser.isActive && eachUser.verified;
    if (!checkList) {
      return;
    }
    if (
      addDurationOnDate(
        process.env.PASSWORD_EXPIRATION_IN || '1s',
        lastTimePasswordUpdated
      ) < now
    ) {
      UserService.updateUser({ mustUpdatePassword: true }, eachUser.id);
      eventEmit(knownEvents.onNotification, {
        type: knownNotificationType.changePassword,
        message: 'Please it is to change your password for security purpose',
        receiverId: eachUser.id,
      });
    }
  });
});

subscribe(knownEvents.changePassword, async (data) => {
  await UserService.updateUser(
    {
      lastTimePasswordUpdated: new Date(),
      mustUpdatePassword: false,
    },
    data.userId
  );
});

export class UserController {
  static async registerUser(req, res) {
    try {
      const user = { ...req.body,usesPassword:true, lastTimePasswordUpdated: new Date() };
      user.password = await BcryptUtility.hashPassword(req.body.password);
      const { id, email, role, lastTimePasswordUpdated } =
        await UserService.register(user);
      const userData = { id, email, role, lastTimePasswordUpdated };
      const userToken = JwtUtility.generateToken(userData, '1h');
      const data = {
        token: userToken,
        revoked: false,
      };
      await saveTokens.saveToken(data);
      const verificationEmail = verifyEmailTemplate(userToken);
      sendEmail(
        emailConfig({
          email: email,
          subject: 'Vikings email verification',
          content: verificationEmail,
        })
      );
      return res.status(201).json({
        message: 'Check your email to verify your account',
        user: userData,
        token: userToken,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to register a new user',
      });
    }
  }

  static async updateUserVerified(req, res) {
    try {
      const user = req.user;
      await UserService.updateUser({ verified: true }, user.id);
      return res.status(200).json({
        message: 'Your account has verified successfully!',
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to confirm user verification',
      });
    }
  }

  static async resendVerificationEmail(req, res) {
    const { id, email, role } = req.user;
    try {
      const userData = { id: id, email: email, role: role };
      const userToken = JwtUtility.generateToken(userData);
      const data = {
        token: userToken,
        revoked: false,
      };
      await saveTokens.saveToken(data);
      const verificationEmail = verifyEmailTemplate(userToken);
      sendEmail(
        emailConfig({
          email: email,
          subject: 'Vikings email verification',
          content: verificationEmail,
        })
      );
      return res.status(200).json({
        message: 'Email has been sent successfully',
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to send email',
      });
    }
  }

  static async googleAuthHandler(req, res) {
    const { value } = req.user.emails[0];
    const { familyName, givenName } = req.user.name;
    const newUser = {
      firstname: familyName,
      lastname: givenName,
      email: value,
      avatar: req.user.photos[0].value,
      verified: true,
    };
    const { id, email } = await UserService.register(newUser);
    const token = JwtUtility.generateToken({
      id: id,
      email: email,
    });
    return res.redirect(`/api/v1/users/redirect?key=${token}`);
  }

  static async updatePassword(req, res) {
    try {
      const password = await BcryptUtility.hashPassword(req.body.new_password);
      await UserService.updateUser({ password }, req.user.id);
      eventEmit(knownEvents.changePassword, {
        userId: req.user.id,
      });
      return res.status(200).json({ message: 'success' });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update the password',
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { id, firstname, email, role, mustUpdatePassword } = req.user;
      const userData = {
        id,
        firstname,
        email,
        role,
        mustUpdatePassword,
      };
      const token = JwtUtility.generateToken(userData, '365d');
      const data = {
        token: token,
        revoked: false,
      };
      await saveTokens.saveToken(data);
      return res.status(200).json({
        token: token,
        message: 'Login successful',
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Error occurred while signing in, try again',
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const { page, limit } = req.query;
      const users = await UserService.getAllUsers(page, limit); res.status(200).json({
        status: 200,
        message: 'All Users retrieved successfully',
        data: users,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message, message: 'Failed to get all users' });
    }
  }

  static async updateRole(req, res) {
    try {
      const role = req.body.role;
      await UserService.updateUser({ role }, req.user.id);
      return res.status(200).json({ message: 'Updated successfully' });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Failed to update role',
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await UserService.getUserById(req.user.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to get user profile',
      });
    }
  }
  static async updateProfile(req, res) {
    try {
      let payload = {
        ...req.body,
        birthdate: new Date(req.body.birthdate || ''),
      };
      req.body.billingAddress && (payload.billingAddress = JSON.parse(req.body.billingAddress));
      if (req.files?.avatar) {
        const { url } = await uploadPhoto(req, res, req.files.avatar);
        payload['avatar'] = url;
      }
      await UserService.updateUser(payload, req.user.id);
      return res.status(200).json({ message: 'updated successful' });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update user profile',
      });
    }
  }
  static async accountStatus(req, res) {
    try {
      const isActive = req.body.isActive;
      await UserService.updateUser({ isActive }, req.user.id);
      if (!isActive) {
        return res.status(200).json({ message: 'Account is disabled' });
      } else {
        return res.status(200).json({ message: 'Account is enabled' });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Failed to update',
      });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const user = req.user;
      const userData = {
        id: user.id,
        email: user.email,
      };
      const resetLink = JwtUtility.generateToken(userData);
      const link = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetLink}`;
      const resetMessage = resetPasswordTemplate(user.email, link);
      sendEmail(
        emailConfig({
          email: user.email,
          subject: 'reset password',
          content: resetMessage,
        })
      );
      return res.status(200).json({ message: 'Email sent!, check your email for next step' });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Error occured when sending email',
      });
    }
  }

  static async resetPassword(req, res) {
    try {
      const id = req.id;
      const { newPassword } = req.body;
      const password = await BcryptUtility.hashPassword(newPassword);
      await UserService.updateUser({ password }, id);
      return res.status(200).json({ message: ' Password reset successfully ' });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Error occured while resetting password',
      });
    }
  }
}
