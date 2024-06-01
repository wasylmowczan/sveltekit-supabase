<script lang="ts">
	const testimonials = [
		{
			name: 'Jane Doe',
			role: 'CEO at Lorem Ipsum',
			image: 'https://picsum.photos/100/100',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.'
		},
		{
			name: 'Jane Doe',
			role: 'CEO at Lorem Ipsum',
			image: 'https://picsum.photos/100/100',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.'
		},
		{
			name: 'Jane Doe',
			role: 'CEO at Lorem Ipsum',
			image: 'https://picsum.photos/100/100',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.'
		}
	];
</script>

<section id="testimonials" class="py-32">
	<div class="container">
		<p class="text-center text-sm font-medium text-primary">Testimonials</p>
		<h2 class="mt-2 text-center text-4xl font-semibold">What our users say</h2>
		<div class="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as testimonial}
				<div class="rounded-box bg-base-200/50 p-8">
					<div class="">
						<p class="text-base-content/80">
							"{testimonial.text}"
						</p>
					</div>
					<div class="mt-8 flex gap-4">
						<div class="flex-shrink-0">
							<img src={testimonial.image} alt="" class="h-10 w-10 rounded-full" />
						</div>
						<div>
							<p class="text-base-content/80">{testimonial.name}</p>
							<p class="text-base-content/80">{testimonial.role}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
