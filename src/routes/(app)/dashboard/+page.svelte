<script>
	import ThemeController from "$lib/ui/components/ThemeController.svelte";
</script>
<section>
	<h1 class="text-xl font-semibold">Dashboard</h1>
	<div class="mt-4">
		<p>Simple dashboard page, the home of your app environment.</p>
		<p class="mt-2">
			Example Stripe checkout page:
			<!-- link to checkout must always have data-sveltekit-reload 
            because otherwise the embedded chekcout won't load -->
			<a href="/checkout" data-sveltekit-reload class="btn btn-primary btn-sm">Subscribe</a>
		</p>
		<p class="mt-2">
			Visit the account page <a href="/account" class="link">here</a> to view profile details and billing
			information.
		</p>
        <p class="mt-2">
            Change theme:
            <ThemeController/>
        </p>
	</div>
</section>
