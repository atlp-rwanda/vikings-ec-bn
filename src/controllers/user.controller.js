import { UserService } from '../services/user.service.js';
import { saveTokens } from '../services/token.service.js';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { JwtUtility } from '../utils/jwt.util.js';

export class UserController {
  static async registerUser(req, res) {
    try {
      const user = { ...req.body };
      user.password = await BcryptUtility.hashPassword(req.body.password);
      const { id, email } = await UserService.register(user);
      const userData = { id, email };
      const userToken = JwtUtility.generateToken(userData);
      const data = {
        token: userToken,
        revoked: false,
      };
      await saveTokens.saveToken(data);
      return res.status(201).json({ user: userData, token: userToken });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to register a new user',
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

  static async loginUser(req, res) {
    try {
      const {
        id,
        email,
        firstname,
        lastname,
        gender,
        role,
        status,
        avatar,
        verified,
      } = req.user;

      const userData = {
        id,
        email,
        role,
        firstname,
        lastname,
        gender,
        status,
        avatar,
        verified,
      };
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
}
