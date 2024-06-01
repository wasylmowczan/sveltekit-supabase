<script lang="ts">
	import { Check } from 'lucide-svelte';
	let yearly = true;
	const pricingTiers = [
		{
			title: 'Free',
			description: 'To start',
			price: 0,
			yearlyPrice: 0,
			features: ['A feature', 'Another feature', 'Free shipping', 'Unlimited support'],
			ctaText: 'Get Started',
			ctaLink: '/signin',
			popular: false
		},
		{
			title: 'Starter',
			description: 'For personal use',
			price: 19,
			yearlyPrice: 190,
			features: ['A feature', 'Another feature', 'Free shipping', 'Unlimited support'],
			ctaText: 'Get Started',
			ctaLink: '/signin',
			popular: true
		},
		{
			title: 'Business',
			description: 'For businesses',
			price: 49,
			yearlyPrice: 490,
			features: ['A feature', 'Another feature', 'Free shipping', 'Unlimited support'],
			ctaText: 'Get Started',
			ctaLink: '/signin',
			popular: false
		}
	];
</script>

<section id="pricing" class="py-32">
	<div class="container">
		<p class="text-center text-sm font-medium text-primary">Pricing</p>
		<h2 class="mt-2 text-center text-4xl font-semibold">Simple pricing</h2>
		<div class="mt-8">
			<label class="flex cursor-pointer justify-center gap-2">
				<span class="label-text flex flex-1 justify-end font-medium">Monthly</span>
				<input type="checkbox" class="toggle toggle-primary" bind:checked={yearly} />
				<span class="label-text flex flex-1 font-medium">Yearly (2 months free)</span>
			</label>
		</div>
		<div class="mt-6 flex flex-wrap justify-center gap-10 md:flex-nowrap">
			{#each pricingTiers as tier}
				<div
					class:border-primary={tier.popular}
					class="bg-base w-full max-w-sm rounded-box border border-base-200 p-5">
					<h3 class="text-2xl font-medium">
						{tier.title}
						{#if tier.popular}
							<span class="badge badge-primary font-normal">Popular</span>
						{/if}
					</h3>
					<p class="text-sm text-base-content/70">{tier.description}</p>
					{#if yearly}
						<p class="mt-4 text-5xl font-semibold">${tier.yearlyPrice}</p>
						<p class="text-sm text-base-content/70">per year</p>
					{:else}
						<p class="mt-4 text-5xl font-semibold">${tier.price}</p>
						<p class="text-sm text-base-content/70">per month</p>
					{/if}
					<ul class="mt-4 space-y-1 font-medium text-base-content/90">
						{#each tier.features as feature}
							<li class="flex items-center gap-2">
								<span class="text-success"><Check size="1em" /></span>{feature}
							</li>
						{/each}
					</ul>
					<a href={tier.ctaLink} class="btn btn-primary btn-block mt-8">{tier.ctaText}</a>
				</div>
			{/each}
		</div>
	</div>
</section>
