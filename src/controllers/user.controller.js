import { UserService } from '../services/user.service.js';
import { saveTokens } from '../services/token.service.js';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { JwtUtility } from '../utils/jwt.util.js';
import models from '../database/models';
import { sendEmail } from '../utils/sendEmail.util';
import { emailConfig } from '../../src/utils/mail.util';
import { verifyEmailTemplate } from '../utils/mailTemplates.util.js';
import dotenv from 'dotenv';
dotenv.config();
import { uploadPhoto } from '../utils/cloudinary.util.js';

export class UserController {
  static async registerUser(req, res) {
    try {
      const user = { ...req.body };
      user.password = await BcryptUtility.hashPassword(req.body.password);
      const { id, email, role } = await UserService.register(user);
      const userData = { id, email, role };
      const userToken = JwtUtility.generateToken(userData, '1h');
      const data = {
        token: userToken,
        revoked: false,
      };
       saveTokens.saveToken(data);
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
      const {
        id,
        email,
        role} = req.user;
      const userData = {
        id,
        email,
        role};
      const token = JwtUtility.generateToken(userData);
      const data = {
        token: token,
        revoked: false,
      };
      await saveTokens.saveToken(data);
      return res.status(200).json({
        token: token,
        message: 'Login successful',
        user: userData,
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
      const users = await models.User.findAll();
      res
        .status(200)
        .json({
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
        billingAddress: JSON.parse(req.body.billingAddress) || {},
        birthdate: new Date(req.body.birthdate || ''),
      };
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
}
