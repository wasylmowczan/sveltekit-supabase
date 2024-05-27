<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	let email = '';
	let loading = false;
	let message = '';
	let errorMessage = '';
	const signInWithEmail = async () => {
		loading = true;
		message = '';
		errorMessage = '';
		const { error } = await data.supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: `${$page.url.origin}/api/auth/callback`
			}
		});

		if (error) {
			console.log(error);
			errorMessage = error.message;
			loading = false;
			return;
		}
		message = 'Check your email for the magic link';
		loading = false;
	};
	const signInWithGoogle = async () => {
		loading = true;
		message = '';
		errorMessage = '';
		await data.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${$page.url.origin}/api/auth/callback`
			}
		});
		loading = false;
	};
</script>

<section class="container">
	<div class="mx-auto max-w-xl px-4 py-20">
		<h1 class="text-2xl font-semibold">Sign in</h1>
		{#if loading}
			<button type="button" class="btn btn-disabled btn-block mt-2"
				><span class="loading loading-spinner"></span> Loading...</button>
		{:else}
			<button type="button" on:click={() => signInWithGoogle()} class="btn btn-block mt-2"
				>Sign in with Google
				<img
					src="https://supabase.com/dashboard/img/icons/google-icon.svg"
					alt="Google"
					width="16"
					height="16" />
			</button>
		{/if}
		<div class="divider">OR</div>

		<form on:submit|preventDefault={signInWithEmail}>
			<div class="form-control">
				<label for="email">Email address</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="Your email address"
					required
					class="input input-bordered" />
			</div>
			{#if loading}
				<button type="submit" class="btn btn-disabled btn-block mt-2"
					><span class="loading loading-spinner"></span> Sending Magic Link</button>
			{:else}
				<button type="submit" class="btn btn-primary btn-block mt-2">Send Magic Link</button>
			{/if}

			{#if message}
				<div class="alert alert-success mt-4">
					{message}
				</div>
			{/if}
			{#if errorMessage}
				<div class="alert alert-error mt-4">
					{errorMessage}
				</div>
			{/if}
		</form>
	</div>
</section>
