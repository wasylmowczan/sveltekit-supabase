<section id="logocloud" class="py-24">
	<div class="container">
		<h2 class="text-center text-xl font-semibold">Trusted by the worlds best developers</h2>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-20">
			{#each [0, 1, 2, 4, 5] as index}
				<img
					class="h-8 w-auto grayscale transition-all duration-300 hover:grayscale-0"
					alt="Logo"
					src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" />
			{/each}
		</div>
	</div>
</section>
