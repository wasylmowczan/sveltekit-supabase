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
		message = 'Перевірте свою електронну пошту, щоб отримати чарівне посилання';
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
		<h1 class="text-2xl font-semibold">Вхід</h1>
		{#if loading}
			<button type="button" class="btn btn-disabled btn-block mt-2"
				><span class="loading loading-spinner"></span> Завантаження...</button>
		{:else}
			<button type="button" on:click={() => signInWithGoogle()} class="btn btn-block mt-2"
				>Увійдіть за допомогою Google
				<img
					src="https://supabase.com/dashboard/img/icons/google-icon.svg"
					alt="Google"
					width="16"
					height="16" />
			</button>
		{/if}
		<div class="divider">або</div>

		<form on:submit|preventDefault={signInWithEmail}>
			<div class="form-control">
				<label for="email">Адреса електронної пошти</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="mail@example.com"
					required
					class="input input-bordered" />
			</div>
			{#if loading}
				<button type="submit" class="btn btn-disabled btn-block mt-2"
					><span class="loading loading-spinner"></span> Надсилання чарівного посилання</button>
			{:else}
				<button type="submit" class="btn btn-primary btn-block mt-2"
					>Надіслати чарівне посилання</button>
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
