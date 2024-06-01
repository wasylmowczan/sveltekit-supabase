import stripe from '$lib/server/stripe.js';

export const load = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');
	if (!sessionId) {
		return;
	}
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	return { status: session.status, email: session.customer_details?.email };
};
