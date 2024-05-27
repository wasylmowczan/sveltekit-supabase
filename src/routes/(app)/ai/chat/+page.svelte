<script lang="ts">
	import { onDestroy } from 'svelte';
	// @ts-ignore sse.js has no types
	import { SSE } from 'sse.js';
	import { page } from '$app/stores';

	// Custom type for chat messages, but is similar to the ChatCompletionChunk.Choices.Delta type
	interface ChatMessage {
		role: 'user' | 'assistant';
		content: string;
	}

	let chatMessages: ChatMessage[] = [];
	let loading = false;
	let message = '';
	let answer = '';
	let eventSource: any;

	// Function to handle any errors with the stream
	const handleStreamError = (error: any) => {
		console.error('Stream encountered an error:', error);
		eventSource.close();
	};

	// Cleanup event source when component is destroyed
	onDestroy(() => {
		if (eventSource) eventSource.close();
	});

	const sendMessage = async () => {
		loading = true;
		// Close any existing connection
		if (eventSource) {
			eventSource.close();
		}

		chatMessages = [...chatMessages, { role: 'user', content: message }];

		// Create a new connection and pass all previous messages + the new one
		eventSource = new SSE('/api/ai/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ chatMessages })
		});

		message = '';
		eventSource.addEventListener('error', handleStreamError);
		eventSource.addEventListener('message', (e: any) => {
			try {
				const completionChunk = JSON.parse(e.data);
				if (completionChunk.choices[0].finish_reason === 'stop') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					eventSource.close();
					loading = false;
					return;
				}
				answer += completionChunk.choices[0].delta.content;
			} catch (err) {
				console.log(err);
			}
		});
		eventSource.stream();
	};
</script>

<section>
	<header class="flex gap-2">
		<a href="/ai/" class="btn btn-circle btn-ghost btn-sm">&leftarrow;</a>
		<div>
			<h1 class="text-2xl font-semibold">Chat Demo</h1>
			<h2 class="mt-2 text-lg font-medium">With GPT-4 Turbo and Streaming Messages</h2>
		</div>
	</header>
	<div id="chat" class="rounded-box mt-5 max-w-3xl border border-base-300 bg-base-200 p-5">
		{#each chatMessages as message}
			<div
				class:chat-start={message.role === 'assistant'}
				class:chat-end={message.role === 'user'}
				class="chat">
				<div class="avatar placeholder chat-image">
					<div class="w-10 rounded-full bg-neutral text-neutral-content">
						{#if message.role === 'user'}
							<span class="uppercase">{$page.data.session?.user.email?.substring(0, 2)}</span>
						{:else}
							<span class="uppercase">AI</span>
						{/if}
					</div>
				</div>
				<div class:chat-bubble-accent={message.role === 'user'} class="chat-bubble">
					{message.content}
				</div>
			</div>
		{/each}
		{#if answer}
			<div class="chat chat-start">
				<div class="avatar placeholder chat-image">
					<div class="w-10 rounded-full bg-neutral text-neutral-content">
						<span class="uppercase">AI</span>
					</div>
				</div>
				<div class="chat-bubble">{answer}</div>
			</div>
		{/if}
		<form on:submit|preventDefault={sendMessage} class="mt-4 flex w-full items-center gap-2">
			<div class="flex-grow">
				<input
					type="text"
					bind:value={message}
					name="message"
					placeholder="Your message"
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
