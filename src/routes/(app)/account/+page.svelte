<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

<section>
	<h1 class="text-xl font-semibold">Account</h1>
	<div class="mt-4">
		<h2 class="text-lg font-medium">
			Email <span class="text-xs">({$page.data.session?.user.email})</span>
		</h2>
		<form action="?/update" method="post">
			<input
				type="text"
				name="firstName"
				placeholder="First name"
				class="input input-bordered"
				value={data.profile.data.first_name ?? ''} />
			<input
				type="text"
				name="lastName"
				placeholder="Last name"
				class="input input-bordered"
				value={data.profile.data.last_name ?? ''} />
			<button type="submit" class="btn btn-primary">Update</button>
		</form>
		{#if form?.success}
			<p class="alert alert-success mt-2 w-fit text-success-content">
				Profile updated successfully.
			</p>
		{/if}
	</div>
</section>