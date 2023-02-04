export function emailConfig({ email, subject, content } = {}) {
	
	return {
		from: process.env.TEAM_EMAIL,
		to: `${email}`,
		subject: `${subject}`,
		html: `${content}`,
	};
}
