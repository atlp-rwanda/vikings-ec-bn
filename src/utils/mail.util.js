import nodemailer from 'nodemailer';
export class Mail {
	static emailConfig({ email, subject, content } = {}) {
		return {
			from: process.env.TEAM_EMAIL,
			to: `${email}`,
			subject: `${subject}`,
			html: `${content}`,
		};
	}

	async sendEmail(mailConfigurations) {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			service: 'gmail',
			secure: false,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const send = transporter.sendMail(mailConfigurations, function (error) {
			if (error) {
				console.log(error);
				return false;
			} else {
				return true;
			}
		});
		return send;
	}

	static generateOTPTemplate(otpCode, firstname) {
		return `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Vikings</a>
                </div>
                <p style="font-size:1.1em">Dear ${firstname},</p>
                <p>We recently detected a login attempt to your vikings account from a new device.</p>
                <p>To ensure the security of your account, we require verification before allowing access from this device.</p>
                <p>Please use the following verification code:</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
                <p>If you didn't attempt to log in, please ignore this email and contact us immediately at vikingsatlp@gmail.com</p>
                <p style="font-size:0.9em;">Best regards,<br />Vikings</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Vikings</p>
                    <p>ATLP</p>
                </div>
            </div>
        </div>`;
	}
}
