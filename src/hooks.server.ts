import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),

			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authorization = (async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	// Line below is commented out because of an issue: https://github.com/supabase/auth-js/issues/873
	// event.locals.session = session; 
	event.locals.user = user;
	if (event.route.id?.startsWith('/(app)') && !session) {
		redirect(303, '/signin');
	}

	if (event.route.id?.startsWith('/(auth)') && session) {
		redirect(303, '/dashboard');
	}

	return resolve(event);
}) satisfies Handle;

export const handle = sequence(supabase, authorization) satisfies Handle;
