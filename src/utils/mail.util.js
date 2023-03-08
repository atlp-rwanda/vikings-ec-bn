export function emailConfig({ email, subject, content } = {}) {
	return {
		from: process.env.EMAIL_USERNAME,
		to: `${email}`,
		subject: `${subject}`,
		html: `${content}`,
	};
}
