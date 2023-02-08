import express from 'express';
import validateRegister from '../../validations/user/register.validation.js';
import {
    checkUserExists,
    getExistUser,
    checkUserVerified,
    checkValidPassword
} from '../../middlewares/user.middleware';
import { UserController } from '../../controllers/user.controller';
import { logout } from "../../controllers/logout.controller"
import protectRoute from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
    '/register',
    validateRegister,
    checkUserExists,
    UserController.registerUser
);
router.post("/logout", protectRoute, logout)

router.post('/login', getExistUser,checkUserVerified,  checkValidPassword, UserController.loginUser);

export default router;