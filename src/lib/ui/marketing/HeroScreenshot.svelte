<script lang="ts">
	import Screenshot from '$lib/assets/screenshot.png';
</script>

<section id="hero" class="py-32">
	<div class="mx-auto max-w-2xl text-center">
		<h1 class="text-4xl font-bold sm:text-6xl">Launch your app in a day</h1>
		<p class="py-8 text-lg leading-8">
			Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
			quasi. In deleniti eaque aut repudiandae et a id nisi.
		</p>
		<div>
			<a href="/signin" class="btn btn-primary">Get started</a>
			<a href="/#" class="btn btn-ghost">Learn more</a>
		</div>
	</div>
	<div class="mx-auto mt-16 max-w-6xl px-10">
		<div class="h-fit w-fit rounded-box border border-base-300 bg-base-200 p-2">
			<img
				src={Screenshot}
				alt="Hero"
				title="Hero"
				class="w-full rounded-xl border border-base-300" />
		</div>
	</div>
</section>
