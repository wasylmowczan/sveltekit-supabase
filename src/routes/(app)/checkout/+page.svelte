<script lang="ts">
	import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;
	onMount(async () => {
		// @ts-ignore - this is a different stripe object, loaded in the head
		const stripe = Stripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);
		const checkout = await stripe.initEmbeddedCheckout({
			clientSecret: data.clientSecret
		});

		// Mount Checkout
		checkout.mount('#checkout');
	});


</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<section>
	<a href="/dashboard" class="btn btn-circle btn-ghost btn-sm">&leftarrow;</a>
	<div id="checkout"></div>
</section>
