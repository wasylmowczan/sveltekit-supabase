import {
	PRIVATE_STRIPE_WEBHOOK_SECRET,
	PRIVATE_SUPABASE_SERVICE_ROLE_API_KEY
} from '$env/static/private';
import stripe from '$lib/server/stripe';
import { createClient } from '@supabase/supabase-js'
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export const POST = (async ({ request }) => {
	const signature = request.headers.get('stripe-signature');
	if (!signature) {
		return new Response(JSON.stringify({ status: 400, message: 'No signature' }));
	}
	const payload = await request.text();
	if (!payload) {
		return new Response(JSON.stringify({ status: 400, message: 'No payload' }));
	}

	const event = stripe.webhooks.constructEvent(payload, signature, PRIVATE_STRIPE_WEBHOOK_SECRET);

	// Be careful with this key, it's the service role key and can bypass Row Level Security (RLS)
	// This is needed to update the user's subscription status from the webhook
	const secretSupabase = createClient(
		PUBLIC_SUPABASE_URL,
		PRIVATE_SUPABASE_SERVICE_ROLE_API_KEY
	);

	switch (event.type) {
		case 'checkout.session.completed': {
			const checkoutSession = event.data.object;
			// If you use one-time payments, you can use this event to provision the product to the user
			// Subscriptions can also be provisioned on this event, but you have to retreive the subscription
			break;
		}
		case 'checkout.session.expired': {
			const checkoutSession = event.data.object;
			break;
		}
		case 'customer.created': {
			const customer = event.data.object;
			const { error } = await secretSupabase
				.from('profiles')
				.update({ stripe_customer_id: customer.id })
				.eq('email', customer.email);
			if (error) {
				console.error(error);
			}
			break;
		}
		case 'customer.source.expiring': {
			const customerCardOrSource = event.data.object;
			break;
		}
		case 'customer.subscription.created': {
			const subscription = event.data.object;
			// TODO update the user's subscription according to your subscription model
			// e.g. add a more descriptive plan name, like 'pro' or 'enterprise'
			// now it's just a subscription id
			// checking for null can be used to check if the user has a subscription at all
			const { error } = await secretSupabase
				.from('profiles')
				.update({ subscription: subscription.id })
				.eq('stripe_customer_id', subscription.customer);
			if (error) {
				console.error(error);
			}
			break;
		}
		case 'customer.subscription.deleted': {
			const subscription = event.data.object;
			const { error } = await secretSupabase
				.from('profiles')
				.update({ subscription: null })
				.eq('stripe_customer_id', subscription.customer);
			if (error) {
				console.error(error);
			}
			break;
		}
		case 'customer.subscription.updated': {
			const subscription = event.data.object;
			const { error } = await secretSupabase
				.from('profiles')
				.update({ subscription: subscription.id })
				.eq('stripe_customer_id', subscription.customer);
			if (error) {
				console.error(error);
			}
			break;
		}

		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new Response(JSON.stringify({ status: 200 }));
}) satisfies RequestHandler;
