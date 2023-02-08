import express from 'express';
import validateRegister from '../../validations/user/register.validation.js';
import { checkUserExists } from '../../middlewares/user.middleware';
import { RegisterController} from '../../controllers/user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRegister,
  checkUserExists,
  RegisterController.registerUser
);

export default router;
