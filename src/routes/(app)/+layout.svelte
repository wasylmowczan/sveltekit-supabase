<script>
	import BottomNavbar from '$lib/ui/app/BottomNavbar.svelte';
	import Navbar from '$lib/ui/app/Navbar.svelte';
	import SidebarNav from '$lib/ui/app/SidebarNav.svelte';
</script>

<div class="md:hidden">
	<Navbar />
</div>
<div class="mt-16 flex flex-grow bg-base-100 pb-16 md:mt-0 md:pb-0">
	<div class="relative hidden md:block">
		<SidebarNav />
	</div>
	<main class="flex-1 p-5">
		<slot />
	</main>
</div>
<div class="md:hidden">
	<BottomNavbar />
</div>
