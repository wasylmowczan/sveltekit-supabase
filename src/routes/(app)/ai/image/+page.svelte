<script lang="ts">
	let loading = false;
	let prompt = '';
	let revisedPrompt = '';
	let imageUrl = '';
	const sendPrompt = async () => {
		loading = true;
		const response = await fetch('/api/ai/image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt })
		});
		const data = await response.json();
		imageUrl = data.image.url;
		revisedPrompt = data.image.revised_prompt;
		loading = false;
	};
</script>

<section>
	<header class="flex gap-2">
		<a href="/ai/" class="btn btn-circle btn-ghost btn-sm">&leftarrow;</a>
		<div>
			<h1 class="text-2xl font-semibold">Image Gen Demo</h1>
			<h2 class="mt-2 text-lg font-medium">With Dall-E 3</h2>
		</div>
	</header>
	<div class="mt-10">
		{#if imageUrl}
			<figure class="">
				<img src={imageUrl} alt="Generated" class="rounded-box max-h-96 w-auto" />
				<figcaption class="mt-1 text-sm font-medium capitalize italic">
					"{revisedPrompt ?? prompt}"
				</figcaption>
			</figure>
		{/if}
		{#if loading}
			<div>
				<span class="loading loading-dots loading-md"></span>
			</div>
		{/if}
		

		<form on:submit|preventDefault={sendPrompt} class="mt-4 flex w-full items-center gap-2">
			<div class="flex-grow">
				<input
					type="text"
					bind:value={prompt}
					name="prompt"
					placeholder="Your image prompt"
					maxlength="4000"
					required
					class="input input-bordered w-full" />
			</div>
			<div>
				{#if loading}
					<button class="btn btn-disabled">Generate image</button>
				{:else}
					<button type="submit" class="btn btn-neutral">Generate image</button>
				{/if}
			</div>
		</form>
	</div>
</section>
