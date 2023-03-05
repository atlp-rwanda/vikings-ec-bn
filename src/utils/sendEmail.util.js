import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = (mailConfigurations) => {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: process.env.SMTP_PORT,
			service: 'gmail',
			secure: false,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			},
		});
		transporter.sendMail(mailConfigurations);
		if (transporter) {
			return true;
		}
};
