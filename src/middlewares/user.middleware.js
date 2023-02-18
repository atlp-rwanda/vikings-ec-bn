import { User } from '../database/models/index';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { JwtUtility } from '../utils/jwt.util.js';
import { jwtTokens } from '../database/models/index';
import { sendAuthCode } from '../services/twoFactorAuth.service';
import { UserService } from '../services/user.service';

export const checkUserExists = async (req, res, next) => {
	const { email } = req.body;
	const userInDb = await User.findOne({
		where: { email: email },
	});
	if (userInDb) {
		return res.status(409).json({ message: 'User with email already registered' });
	}
	next();
};

export const getUserByEmail = async (req, res, next) => {
	const user = await User.findOne({ where: { email: req.body.email } });
	if (!user) {
		return res.status(404).json({ message: 'User has not found, try again' });
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
export const checkIfUserExistById = async (req, res, next) => {
	const id = req.params.userId;
	const user = await User.findByPk(id);
	if (!user) {
		return res
			.status(404)
			.json({ message: 'User does not exist' });
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
		return res.status(409).json({ message: 'Invalid password, try again.' });
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

export const checkTokenNotRevoked = async (req, res, next) => {
	const userToken =
		req.params.token || req.header('Authorization').split(' ')[1];
	const getToken = await jwtTokens.findOne({
		where: { token: userToken },
	});
	if (getToken && !getToken.revoked) {
		next();
	} else {
		return res
			.status(403)
			.json({ message: 'Error occurred while verifying your account' });
	}
};

export const verifyAndRevokeToken = async (req, res, next) => {
	const userToken = req.params.token;
	const decoded = JwtUtility.verifyToken(userToken);
	if (decoded) {
		await jwtTokens.update(
			{ revoked: true },
			{
				where: { token: userToken },
			}
		);
		req.user = decoded;
		next();
	} else {
		return res.status(403).json({ message: 'Failed to to verify email' });
	}
};

export const checkEmailExists = async (req, res, next) => {
	const userEmail = req.body.email;
	const getUser = await User.findOne({
		where: { email: userEmail },
	});
	if (getUser) {
		req.user = getUser;
		next();
	} else {
		res.status(404).json({ message: 'Email does not exist' });
	}
};

export const checkDisabledAccount = async (req, res, next) => {
	if (!req.user.isActive) {
		return res.status(403).json({ message: 'Your account has been disabled' });
	}
	next();
};

export const checkSeller = async (req, res, next) => {
	if (req.user.role === 'seller') {
    const { firstname, email, id} = req.user;
    sendAuthCode(firstname, email, id);
    return res.status(403).json({message: 'Check your email for verification code'});
	}
  next();
};

export const verifyAuthCode = async (req, res, next)=>{
  const authCode = req.body.authCode;

  if (authCode !== req.user.authCode){
    return res.status(403).json({message: 'Code does not match. Try again'});
  }

  next();
};

export const removeAuthCode = async(req, res, next)=>{
  const authCode = null;
  await UserService.updateUser({authCode}, req.user.id);
  next();
};
