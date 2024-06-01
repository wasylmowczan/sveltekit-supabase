import { ORIGIN } from '$env/static/private';
import stripe from '$lib/server/stripe';

export const load = async ({ locals }) => {
	const session = await locals.safeGetSession();
	const profile = await locals.supabase
		.from('profiles')
		.select('stripe_customer_id')
		.eq('id', session?.user?.id)
		.single();
	const customerId: string | undefined = profile.data?.stripe_customer_id;
	const customerEmail: string | undefined = session?.user?.email;
	const checkoutSesion = await stripe.checkout.sessions.create({
		ui_mode: 'embedded',
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: 'price_1OAtOXBCgEoKT4XDWpBh84u4', // Replace with the ID of your price object
				quantity: 1
			}
		],
		mode: 'subscription',
		return_url: `${ORIGIN}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
		automatic_tax: { enabled: true },
		...(customerId ? { customer: customerId } : {}),
		...(customerEmail && !customerId ? { customer_email: customerEmail } : {})
	});

	return { clientSecret: checkoutSesion.client_secret };
};
