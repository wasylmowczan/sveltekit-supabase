<script lang="ts">
	let loading = false;
	let files: FileList;
	let transcript = ``;
	const sendFile = async () => {
		loading = true;
		transcript = '';
		const file = files[0];
		const formData = new FormData();
		formData.append('file', file);
		const response = await fetch('/api/ai/speech-to-text', {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		transcript = data.text;
		loading = false;
	};
</script>

<section>
	<header class="flex gap-2">
		<a href="/ai/" class="btn btn-circle btn-ghost btn-sm">&leftarrow;</a>
		<div>
			<h1 class="text-2xl font-semibold">Speech-to-text Demo</h1>
			<h2 class="mt-2 text-lg font-medium">With Whisper (Whisper large v2)</h2>
		</div>
	</header>
	<div class="mt-10">
		<div>
			<p class="rounded-box bg-base-200 p-5">
				{#if transcript && !loading}
					{transcript}
				{:else if loading}
					<span class="loading loading-dots loading-md"></span>
				{/if}
			</p>
		</div>
		<form on:submit|preventDefault={sendFile} class="mt-4 flex w-full items-center gap-2">
			<div class="flex-grow">
				<input
					type="file"
					bind:files
					name="file"
					accept="audio/*"
					required
					class="file-input file-input-bordered w-full" />
			</div>
			<div>
				{#if loading}
					<button class="btn btn-disabled">Generate transcript</button>
				{:else}
					<button type="submit" class="btn btn-neutral">Generate transcript</button>
				{/if}
			</div>
		</form>
	</div>
</section>
