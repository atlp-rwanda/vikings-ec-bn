import { User } from '../database/models/index';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { JwtUtility } from '../utils/jwt.util.js';
import { jwtTokens } from '../database/models/index';
import { sendAuthCode } from '../services/twoFactorAuth.service';
import { UserService } from '../services/user.service';
import path from 'path';
import { isPatternValid } from '../utils/date.util';
import { saveTokens } from '../services/token.service';

export const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const userInDb = await User.findOne({
    where: { email: email },
  });
  if (userInDb) {
    return res
      .status(409)
      .json({ message: 'User with email already registered' });
  }
  next();
};

export const getUserByEmail = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: 'User not found, try again' });
  }
  req.user = user;
  next();
};

export const checkUserByEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: { email: req.user.emails[0].value },
  });
  if (user) {
    const { id, email, role } = user;
    const token = JwtUtility.generateToken({
      id: id,
      email: email,
      role: role,
    });
    const data = {
      token: token,
      revoked: false,
    };
    await saveTokens.saveToken(data);
    return res.redirect(`/api/v1/users/redirect?key=${token}`);
  }
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
    return res.status(404).json({ message: 'User does not exist' });
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

export const checkIfUsesPassword = async (req, res,next) => {
  const {email} =  req.body.email? req.body:req.user;
  const user = await User.findOne({ where: { email: email } });
  if (!user.usesPassword) {
    return res.status(400).json({ message: 'User doesn\'t use password' });
  }
  next();
};

export const checkTokenNotRevoked = async (req, res, next) => {
    const userToken = req.params.token;
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
    const { firstname, email, id,role,verified } = req.user;
    const user = {
      id,
      role,
      verified,
    };
    sendAuthCode(firstname, email, id);
    return res
      .status(403)
      .json({ message: 'Check your email for verification code',user:user });
  }
  next();
};

export const verifyAuthCode = async (req, res, next) => {
  const authCode = req.body.authCode;

  if (authCode !== req.user.authCode) {
    return res.status(403).json({ message: 'Code does not match. Try again' });
  }

  next();
};

export const removeAuthCode = async (req, res, next) => {
  const authCode = null;
  await UserService.updateUser({ authCode }, req.user.id);
  next();
};

export const VerifyResetPasswordToken = async (req, res, next) => {
	const { token } = req.params;
	const verify = JwtUtility.verifyToken(token);
	const id = verify.id;
	req.id = id;
	const user = await User.findByPk(id);
	if (!user) {
		return res.status(404).json({ message: 'User does not exist' });
	}
	next();
};


export const checkImageExtensions = (field, extensions) => {
	return (req, res, next) => {
		if (req.files[field]) {
			const ext = path.extname(req.files[field].name);
			if (!extensions.includes(ext)) {
				return res.status(400).json({
					message: `Invalid extension for file '${req.files[field].name}'`,
				});
			}
		}
		next();
	};
};

export const checkBirthDate = (field) => {
	return (req, res, next) => {
		if (req.body[field]) {
			const birthDate = new Date(req.body[field]);
			if (birthDate > new Date()) {
				return res.status(400).json({
					message: 'Invalid date ',
				});
			}
		}
		next();
	};
};

export const checkPhone = (field) => {
	return (req, res, next) => {
		const pattern = '^(\\+\\d{1,3}[\\s.-]?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{3,4}$';
		if (req.body[field] && !isPatternValid(req.body[field], pattern)) {
			return res.status(400).json({
				message: 'Invalid phone number ',
			});
		}
		next();
	};
};
