export const load = async ({ locals }) => {
	const session = await locals.safeGetSession();
	const profile = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', session?.user?.id)
		.single();
	return { profile };
};
