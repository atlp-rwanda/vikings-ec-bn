import nodemailer from 'nodemailer';

export const sendEmail = (mailConfigurations) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		service: 'gmail',
		secure: false,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	transporter.sendMail(mailConfigurations);
	if (transporter) {
		return true;
	}
};
