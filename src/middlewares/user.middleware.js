import { User } from '../database/models/index';

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
