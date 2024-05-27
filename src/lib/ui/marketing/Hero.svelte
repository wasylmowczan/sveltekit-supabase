<script lang="ts">
	import Rating from '$lib/ui/marketing/Rating.svelte';
	import Screenshot from '$lib/assets/screenshot.png';
</script>

<section id="hero" class="py-16 lg:py-32">
	<div class="container grid gap-10 lg:grid-cols-2">
		<div class="text-center lg:max-w-xl lg:text-left">
			<h1 class="text-4xl font-bold sm:text-6xl">Launch your app in a day (demo)</h1>
			<p class="mt-6 text-lg leading-8">
				This is a demo of the Launch
				Leopard SvelteKit boilerplate, Supabase version.
			</p>
			<div class="mt-6">
				<a href="/signin" class="btn btn-primary">Get Started</a>
			</div>
			<div class="mx-auto mt-6 inline-flex items-center gap-2">
				<div class="avatar-group -space-x-4 rtl:space-x-reverse">
					{#each [0, 0, 0, 0, 0] as name, index}
						<div class="avatar">
							<div class="w-8">
								<img src="https://i.pravatar.cc/64?u={index}" alt="Profile" />
							</div>
						</div>
					{/each}
				</div>
				<div>
					<Rating />
				</div>
			</div>
		</div>
		<div class="mx-auto mt-auto h-fit w-fit rounded-box border border-base-300 bg-base-200 p-2">
			<img
				src={Screenshot}
				alt="Hero"
				title="Hero"
				class="w-full rounded-xl border border-base-300 lg:max-h-96 lg:w-auto" />
		</div>
	</div>
</section>
