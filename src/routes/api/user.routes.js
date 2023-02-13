import express from 'express';
import passport from 'passport';
import validateRegister from '../../validations/user/register.validation.js';
import {
  checkUserExists,
  checkUserVerified,
  checkValidPassword,
  getExistUser,
} from '../../middlewares/user.middleware';
import { logout } from '../../controllers/logout.controller';
import protectRoute from '../../middlewares/auth.middleware.js';
import { UserController } from '../../controllers/user.controller';
import { googlePass } from '../../authentication/passport.authentication.js';
import { JwtUtility } from '../../utils/jwt.util.js';
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
router.post('/logout', protectRoute, logout);

router.post(
  '/login',
  getExistUser,
  checkUserVerified,
  checkValidPassword,
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

export default router;
