export function emailConfig({ email, subject, content } = {}) {
	console.log('called email config =====================');
	return {
		from: process.env.TEAM_EMAIL,
		to: `${email}`,
		subject: `${subject}`,
		html: `${content}`,
	};
}
