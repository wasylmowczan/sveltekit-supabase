<script lang="ts">
	import { Building, UserCheck, UserCheck2, WalletCards } from 'lucide-svelte';

	const features = [
		{
			title: 'Банки',
			description: 'Слідкуйте за баночками, поширюйте баночки друзям, підписуйтесь на баночки!',
			icon: WalletCards
		},
		{
			title: 'Попроси про допомогу',
			description:
				'Завдяки нашому порталу ви можете попросити про допомогу у вирішенні вашої проблеми. Житло, їжа, робота, медична допомога - все чого потребуєш!',
			icon: UserCheck
		},
		{
			title: 'Пропоную допомогу',
			description:
				'Launch Leopard includes Tailwind CSS and DaisyUI. You can easily customize the theme to match your brand.',
			icon: UserCheck2
		},
		{
			title: 'Список перевірених організацій',
			description:
				'Для тих, хто хоче бути корисним, ми зібрали список організацій. Будьте корисними!',
			icon: Building
		}
	];
</script>

<section id="features">
	<div class="container">
		<h2 class="mt-2 text-center text-4xl font-semibold">Як працює портал 🤔</h2>
		<p class="mt-4 text-center text-xl font-medium text-base-content/80"></p>
		<div class="mt-20 grid gap-10 py-10 md:grid-cols-2">
			{#each features as feature}
				<div class="flex gap-6 pb-4">
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
