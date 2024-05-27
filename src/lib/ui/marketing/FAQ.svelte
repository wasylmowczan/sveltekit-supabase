<script lang="ts">
	const faqs = [
		{
			question: 'What is Launch Leopard?',
			answer: 'Launch Leopard is a SvelteKit boilerplate to get you up and running quickly.'
		},
		{
			question: 'How does Launch Leopard work?',
			answer: 'Just clone the repo or click on \'use template\' on Github and you\'re good to go!'
		},
		{
			question: 'Can I use Launch Leopard for personal and professional purposes?',
			answer: 'Absolutely!'
		}
	];
</script>

<section id="faq" class="py-32">
	<div class="container">
		<div class="flex flex-wrap gap-10 md:flex-nowrap">
			<div class="md:basis-1/3">
				<h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
				<p class="mt-2 text-base-content">
					Here are some of our FAQs. If you have any other questions you'd like answered please feel
					free to email us.
				</p>
			</div>
			<div class="w-full space-y-2 md:basis-2/3">
				{#each faqs as faq}
					<div class="collapse collapse-plus bg-base-200">
						<input type="radio" name="faq-accordion" />
						<div class="collapse-title text-xl font-medium">
							{faq.question}
						</div>
						<div class="collapse-content">
							<p>{faq.answer}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
