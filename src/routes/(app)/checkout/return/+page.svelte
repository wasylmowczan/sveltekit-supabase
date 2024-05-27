<script lang="ts">
	export let data;
</script>

<section>
	<h1 class="text-xl">Checkout return</h1>
	{#if data.status === 'complete'}
		<div class="alert alert-success mt-2">
			<p>You have successfully subscribed!</p>
			<p>
				A confirmation email has been sent to {data.email}.
			</p>
		</div>
	{/if}
</section>
