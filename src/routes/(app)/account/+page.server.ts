import { ORIGIN } from '$env/static/private';
import stripe from '$lib/server/stripe';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
	const session = await locals.safeGetSession();
	const profile = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', session?.user?.id)
		.single();
	return { profile };
};

export const actions = {
	customerPortal: async ({ locals }) => {
		const session = await locals.safeGetSession();
		const profile = await locals.supabase
			.from('profiles')
			.select('stripe_customer_id')
			.eq('id', session?.user?.id)
			.single();
		const billingSession = await stripe.billingPortal.sessions.create({
			customer: profile.data?.stripe_customer_id,
			return_url: `${ORIGIN}/account`
		});
		redirect(303, billingSession.url ?? '/account');
	},
	update: async ({ locals, request }) => {
		const session = await locals.safeGetSession();
		const data = await request.formData();
		const firstName = data.get('firstName') as string;
		const lastName = data.get('lastName') as string;
		const { error } = await locals.supabase
			.from('profiles')
			.update({
				first_name: firstName,
				last_name: lastName,
			})
			.eq('id', session?.user?.id)
			.single();
		if (error) {
			console.log(error);
			return fail(500, { error });
		}
		return { success: true };
	},
	signOut: async ({ locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession();
		if (session) {
			await supabase.auth.signOut();
			redirect(303, '/');
		}
	}
} satisfies Actions;
