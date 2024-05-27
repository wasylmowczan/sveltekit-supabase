
import type { RequestHandler } from './$types';

export const GET = (async ({ request, locals }) => {
	const session = await locals.safeGetSession();
	if (!session) {
		throw new Error('Unauthorized');
	}

	// With Supabase SDK
	const user = await locals.supabase
		.from('users')
		.select('*')
		.eq('id', session.user?.id)
		.single();

	return new Response(JSON.stringify(user));
}) satisfies RequestHandler;
