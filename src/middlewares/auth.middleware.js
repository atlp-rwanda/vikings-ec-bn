import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (!token)
    return res.status(201).json({ message: 'Unauthorized request' });

	jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
		if (err)
			return res.status(401).json({ message: 'Invalid or expired token'});
		req.user = user;
		next();
	});
};


