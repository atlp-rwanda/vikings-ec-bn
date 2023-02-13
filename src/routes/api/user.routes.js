import express from 'express';
import passport from 'passport';
import validateRegister from '../../validations/user/register.validation.js';
import validatePassword from '../../validations/user/updatePassword.validation.js';
import protectRoute from '../../middlewares/auth.middleware.js';
import {
  checkUserExists,
  getUserByEmail,
  checkUserVerified,
  CheckLoginPassword,
  checkValidOldPassword,
} from '../../middlewares/user.middleware';
import { UserController } from '../../controllers/user.controller';
import { JwtUtility } from '../../utils/jwt.util.js';
import { logout } from '../../controllers/logout.controller';
import { googlePass } from '../../authentication/passport.authentication.js';
googlePass();

const router = express.Router();

router.get('/redirect', (req, res) => {
  if (req.query.key) {
    const user = JwtUtility.verifyToken(req.query.key);
    return res
      .status(200)
      .json({ message: 'Thanks for logging in', user: user });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

router.post(
  '/register',
  validateRegister,
  checkUserExists,
  UserController.registerUser
);

router.post(
  '/login',
  getUserByEmail,
  checkUserVerified,
  CheckLoginPassword,
  UserController.loginUser
);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  UserController.googleAuthHandler
);

router.patch(
  '/update-password',
  validatePassword,
  protectRoute,
  checkValidOldPassword,
  UserController.updatePassword
);

router.post('/logout', protectRoute, logout);

export default router;
