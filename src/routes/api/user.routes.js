import express from 'express';
import validateRegister from '../../validations/user/register.validation.js';
import { checkUserExists, checkUserVerified, checkValidPassword, getExistUser } from '../../middlewares/user.middleware';
import { UserController } from '../../controllers/user.controller';
const router = express.Router();

router.post(
  '/register',
  validateRegister,
  checkUserExists,
  UserController.registerUser
);

router.post('/login', getExistUser, checkUserVerified, checkValidPassword,UserController.loginUser);

export default router;
