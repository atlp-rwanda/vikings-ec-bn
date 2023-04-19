import express, { Router } from 'express';
import passport from 'passport';
import validatePassword from '../../validations/user/updatePassword.validation.js';
import validateNewPassword from '../../validations/resetPassword.validation';
import validateRegister from '../../validations/user/register.validation.js';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware.js';
import {
  checkUserExists,
  getUserByEmail,
  verifyAndRevokeToken,
  checkUserVerified,
  CheckLoginPassword,
  checkValidOldPassword,
  checkIfUserExistById,
  checkEmailExists,
  checkTokenNotRevoked,
  checkDisabledAccount,
  checkSeller,
  verifyAuthCode,
  removeAuthCode,
  VerifyResetPasswordToken,
  checkImageExtensions,
  checkBirthDate,
  checkPhone,
  checkUserByEmail,
} from '../../middlewares/user.middleware';
import {
  getUserWishes,
} from '../../middlewares/wishlist.middleware';
import { logout } from '../../controllers/logout.controller';
import { UserController } from '../../controllers/user.controller';
import { JwtUtility } from '../../utils/jwt.util.js';
import { googlePass } from '../../authentication/passport.authentication.js';
import validateRole from '../../validations/user/role.validation.js';
import validateStatus from '../../validations/user/status.validation.js';
import validateLogin from '../../validations/user/login.validation.js';
import validateAuthCode from '../../validations/user/2facode.validation.js';
import validateEmail from '../../validations/email.validation.js';
import { WishlistController } from '../../controllers/wishlist.controller';
import { uuidValidation } from '../../validations/user/userId.validation.js';
import validatePagenation from '../../validations/order/order.validation.js';
import { receivedPaginationFormat } from '../../middlewares/order.middleware.js';

googlePass();

const router = express.Router();

router.get('/redirect', (req, res) => {
  if (req.query.key) {
    return res
      .status(200)
      .json({ message: 'Thanks for logging in',token:req.query.key });
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
  validateLogin,
  getUserByEmail,
  checkDisabledAccount,
  checkUserVerified,
  CheckLoginPassword,
  checkSeller,
  UserController.loginUser
);

router.post(
  '/login/verify/:userId',
  uuidValidation('userId'),
  validateAuthCode,
  checkIfUserExistById,
  verifyAuthCode,
  removeAuthCode,
  UserController.loginUser
);

router.get(
  '/verify-email/:token',
  checkTokenNotRevoked,
  verifyAndRevokeToken,
  UserController.updateUserVerified
);

router.post(
  '/resend-verify-email',
  checkEmailExists,
  UserController.resendVerificationEmail
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
  checkUserByEmail,
  UserController.googleAuthHandler
);
router.get('/profile', protectRoute, UserController.getProfile);
router.put(
  '/profile',
  protectRoute,
  checkImageExtensions('avatar', ['.jpg', '.png', '.webp', '.jpeg', '.gif']),
  checkBirthDate('birthdate'),
  checkPhone('phone'),
  UserController.updateProfile);

router.patch(
  '/update-password',
  validatePassword,
  protectRoute,
  checkValidOldPassword,
  UserController.updatePassword
);

router.post('/logout', protectRoute, logout);

router.get('/',
  protectRoute,
  restrictTo('admin'),
  validatePagenation,
  receivedPaginationFormat,
  UserController.getAllUsers);

router.patch(
  '/:userId',
  protectRoute,
  restrictTo('admin'),
  uuidValidation('userId'),
  validateRole,
  checkIfUserExistById,
  UserController.updateRole
);
router.put(
  '/:userId',
  protectRoute,
  restrictTo('admin'),
  uuidValidation('userId'),
  validateStatus,
  checkIfUserExistById,
  UserController.accountStatus
);

router.post(
  '/forgot-password',
  validateEmail,
  checkEmailExists,
  UserController.forgotPassword
);

router.patch(
  '/reset-password/:token',
  validateNewPassword,
  VerifyResetPasswordToken,
  UserController.resetPassword
);

router.get(
  '/:userId/product-wishes',
  protectRoute,
  getUserWishes,
  restrictTo('buyer', 'admin'),
  checkIfUserExistById,
  WishlistController.getWishByUser
);

export default router;
