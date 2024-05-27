<script lang="ts">
	import Footer from '$lib/ui/marketing/Footer.svelte';
	import Navbar from '$lib/ui/marketing/Navbar.svelte';
</script>

<Navbar />
<div class="flex-grow mt-[4.25rem]">
	<slot/>
</div>
<Footer />