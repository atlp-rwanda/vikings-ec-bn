import { User } from '../database/models/index';
import { BcryptUtility } from '../utils/bcrypt.util.js';

export const checkUserExists = async(req, res, next) => {
    const { email } = req.body;
    const userInDb = await User.findOne({
        where: { email: email },
    });
    if (userInDb) {
        return res.status(409).json({ message: 'Email already exists' });
    }
    next();
};

export const getExistUser = async(req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({ message: 'Wrong credentials, try again.' });
    }
    req.user = user;
    next();

};

export const checkUserVerified = async(req, res, next) => {
    const user = req.user;
    if (!user.verified) {
        return res.status(400).json({ message: 'User email is not verified' });
    }
    next();
};

export const checkValidPassword = async(req, res, next) => {
    const { password } = req.body;
    const user = req.user;
    const isValidPassword = await BcryptUtility.verifyPassword(
        password,
        user.password
    );
    if (!isValidPassword)
        return res.status(400).json({ message: 'Wrong credentials, try again.' });
    next();
};