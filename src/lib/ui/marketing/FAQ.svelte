<script lang="ts">
	const faqs = [
		{
			question: 'Як долучитися?',
			answer: 'Поширюйте інформацію про збори, допомагайте потребуючим, ставайте волонтером в одній з організацій ...'
		},
		{
			question: 'Мені потрібна допомога, як мені про це сказати?',
			answer: 'Додайте своє оголошення з проханням про допомогу і небайдужі люди знайдуть вас.'
		},
		{
			question: 'Я хочу допомогти, але не знаю як...',
			answer: 'Ви можете допомогти фінансово своїм донатом, волонтерською роботою або просто поширюючи інформацію про потребуючих.'
		}
	];
</script>

<section id="faq" class="py-32">
	<div class="container">
		<div class="flex flex-wrap gap-10 md:flex-nowrap">
			<div class="md:basis-1/3">
				<h2 class="text-2xl font-bold">Хто ми?</h2>
				<p class="mt-2 text-base-content">
					Проект повстав на волонтерських засадах. У нас не маємо жодних комерційних цілей. Ми просто хочемо допомогти людям.
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
