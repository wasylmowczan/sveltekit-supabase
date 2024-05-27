export const load = async ({ locals: { session }, cookies }) => {
	// Get the theme from the cookie, or default to 'default'
	const theme = cookies.get('theme') || 'default';
	return {
		session,
		theme
	};
};
