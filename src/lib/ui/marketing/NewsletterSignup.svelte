<script lang="ts">
	let loading = false;
	let message = '';
	async function newsletterSignup(event: Event) {
		loading = true;
		message = '';
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		// Loops.so API requires form data to be URL encoded, not FormData
		const formBody = new URLSearchParams();
		for (const [key, value] of formData) {
			formBody.append(key, value.toString());
		}
		const response = await fetch(form.action, {
			method: form.method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: formBody
		});
		if (response.ok) {
			loading = false;
			message = "Thanks for signing up! We'll be in touch.";
			form.reset();
			return;
		}
		loading = false;
		message = 'Something went wrong. Please try again. (this is a test)';
	}
</script>

<div class="bg-base-200 py-20 text-center">
	<h2 class="text-2xl font-bold">Підпишіться на нашу розсилку 📮</h2>
	<form
		on:submit|preventDefault={newsletterSignup}
		action="https://app.loops.so/api/newsletter-form/clwoliaas00is4hd587uqdr6m"
		method="post"
		class="mt-4 flex items-center justify-center gap-2">
		<input
			type="email"
			placeholder="you@example.com"
			class="input input-bordered"
			name="email"
			required />
		<input type="hidden" name="userGroup" value="Newsletter" />
		{#if loading}
			<button disabled class="btn btn-primary loading loading-spinner"> </button>
		{:else}
			<button type="submit" class="btn btn-primary">Підписатися</button>
		{/if}
	</form>
	{#if message}
		<p class="mt-2 text-sm">{message}</p>
	{/if}
</div>
