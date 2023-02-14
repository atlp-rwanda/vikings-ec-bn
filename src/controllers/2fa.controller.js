import { JwtUtility } from '../utils/jwt.util.js';
import { saveTokens } from '../services/token.service.js';
import { TwoFAAuthentication } from '../services/2fa.service';
import { generateRandomCode } from '../utils/2fa.util';
import { UserService } from '../services/user.service';
import { Mail } from '../utils/mail.util';

export class TwoFAController {
	static async generateCode(req, res) {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ message: 'Bad request' });
			const user = await UserService.retrieve(id);
			const { email, firstname } = user;
			const code = generateRandomCode();
			await TwoFAAuthentication.saveAuthCode({ value: code });
			const verificationMEssage = Mail.generateOTPTemplate(code, firstname);
			await Mail.sendEmail(
				Mail.emailConfig({
					email: email,
					subject: 'Login verification code',
					content: verificationMEssage,
				})
			);

			return res
				.status(200)
				.json({ message: 'Check email for verification code' });
		} catch (err) {
			return res
				.status(500)
				.json({ error: err, message: 'Error generating verification code' });
		}
	}

	static async validateCode(req, res) {
		try {
			const { id } = req.params;
			const { inputCode } = req.body;
			if (!inputCode)
				return res.status(403).json({ message: 'Invalid verification code' });

			const code = await TwoFAAuthentication.getAuthCode(inputCode);
			if (!code)
				return res.status(403).json({ message: 'Invalid verification code' });

			const expiresIn = 1000 * 60 * 15;
			if (Date.now() - code.createdAt.getTime() > expiresIn)
				return res.status(403).json({ message: 'Expired verification code' });

			const user = await UserService.retrieve(id);

			if (!user) return res.status(400).json({ message: 'Bad request' });
			const userData = { id: user.id, email: user.email };

			const token = JwtUtility.generateToken(userData);
			const data = {
				token: token,
				revoked: false,
			};
			await saveTokens.saveToken(data);
			await TwoFAAuthentication.removeAuthCode(inputCode);
			return res.status(200).json({
				token: token,
				message: 'Login successful',
				user: userData,
			});
		} catch (err) {
			return res.status(500).json({
				error: err.message,
				message: 'Error occurred while signing in, try again',
			});
		}
	}
}
