<script lang="ts">
	let loading = false;
	let input = '';
	let audio: HTMLAudioElement;
	const sendPrompt = async () => {
		loading = true;
		const response = await fetch('/api/ai/text-to-speech', {
			method: 'POST',
			body: JSON.stringify({ input })
		});
		const blob = new Blob([await response.arrayBuffer()], { type: 'audio/mp3' });
		audio.src = URL.createObjectURL(blob);
		audio.play();
		loading = false;
	};
</script>

<section>
	<header class="flex gap-2">
		<a href="/ai/" class="btn btn-circle btn-ghost btn-sm">&leftarrow;</a>
		<div>
			<h1 class="text-2xl font-semibold">Text-to-speech Demo</h1>
			<h2 class="mt-2 text-lg font-medium">With tts-1</h2>
		</div>
	</header>
	<div class="mt-10">
		<figure>
			<audio bind:this={audio} controls class="w-full"></audio>
			{#if loading}
				<span class="loading loading-dots loading-md"></span>
			{/if}
		</figure>
		<form on:submit|preventDefault={sendPrompt} class="mt-4 flex w-full items-center gap-2">
			<div class="flex-grow">
				<input
					type="text"
					bind:value={input}
					name="prompt"
					placeholder="Your text"
					required
					class="input input-bordered w-full" />
			</div>
			<div>
				{#if loading}
					<button class="btn btn-disabled">Send</button>
				{:else}
					<button type="submit" class="btn btn-neutral">Send</button>
				{/if}
			</div>
		</form>
	</div>
</section>
