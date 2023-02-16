export function emailConfig({ email, subject, content } = {}) {
	return {
		from: process.env.YVES_EMAIL,
		to: `${email}`,
		subject: `${subject}`,
		html: `${content}`,
	};
}
