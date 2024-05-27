<script lang="ts">
	export let data;
</script>

<section class="">
	<h1 class="text-xl font-semibold">Billing</h1>
	<div class="mt-4">
		{#if data.profile.data.stripe_customer_id}
			<p>Go to Stripe Customer Portal to manage subscription and view invoices.</p>
			<form method="POST" action="?/customerPortal">
				<button type="submit" class="btn btn-primary btn-sm">Customer Portal</button>
			</form>
		{:else}
			<p>
				User is not a Stripe customer yet, go to <a href="/dashboard" class="link">dashboard</a> and
				click on "Subscribe" to become a customer.
			</p>
		{/if}
	</div>
</section>
