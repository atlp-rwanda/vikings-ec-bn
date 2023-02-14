import { User } from '../database/models/index';
import { BcryptUtility } from '../utils/bcrypt.util.js';

export const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const userInDb = await User.findOne({
    where: { email: email },
  });
  if (userInDb) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  next();
};

export const getUserByEmail = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: 'Wrong credentials, try again.' });
  }
  req.user = user;
  next();
};

export const checkUserVerified = async (req, res, next) => {
  const user = req.user;
  if (!user.verified) {
    return res.status(409).json({ message: 'User email is not verified' });
  }
  next();
};
export const checkIfUserExistById = async(req, res, next) => {

    const id = req.params.id;
    const user =await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ error: `User with ID = ${id} does not exist` });
    }
    req.user = user;
    next();

};

export const CheckLoginPassword = async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;
  const isValidPassword = await BcryptUtility.verifyPassword(
    password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(409).json({ message: 'Wrong credentials, try again.' });
  }
  next();
};

export const checkValidOldPassword = async (req, res, next) => {
  const { old_password } = req.body;
  const user = await User.findByPk(req.user.id);
  const isValidPassword = await BcryptUtility.verifyPassword(
    old_password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(409).json({ message: 'Wrong credentials, try again.' });
  }
  next();
};
