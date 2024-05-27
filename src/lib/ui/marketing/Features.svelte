<script lang="ts">
	import { Check } from 'lucide-svelte';

	const features = [
		{
			title: 'Full Stack',
			description:
				'Launch Leopard is a full stack SvelteKit boilerplate. It includes a backend API built with Supabase or Authjs + Drizzle ORM.',
			icon: Check
		},
		{
			title: 'Payments',
			description:
				'Launch Leopard includes a payments API built with Stripe. You can easily add subscriptions and one-time payments to your app.',
			icon: Check
		},
		{
			title: 'Styling',
			description:
				'Launch Leopard includes Tailwind CSS and DaisyUI. You can easily customize the theme to match your brand.',
			icon: Check
		},
		{
			title: 'And more...',
			description:
				'Launch Leopard includes a bunch of other features like AI APIs, SEO optimizations, email, and more.',
			icon: Check
		}
	];
</script>

<section id="features" class="py-32">
	<div class="container">
		<p class="text-center text-sm font-medium text-primary">Features</p>
		<h2 class="mt-2 text-center text-4xl font-semibold">What to expect</h2>
		<p class="mt-4 text-center text-xl font-medium text-base-content/80">
			List your most important feautures here. Talk about the benefits of the feature for the user.
		</p>
		<div class="mt-20 grid gap-10 md:grid-cols-2">
			{#each features as feature}
				<div class="flex gap-6">
					<div>
						<div class="flex h-10 w-10 justify-center rounded-lg bg-primary">
							<span class="place-self-center text-2xl text-primary-content"
								><svelte:component this={feature.icon} size="1em" /></span>
						</div>
					</div>
					<div>
						<h3 class="text-2xl font-semibold">{feature.title}</h3>
						<p class="mt-2 text-base-content/80">
							{feature.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
