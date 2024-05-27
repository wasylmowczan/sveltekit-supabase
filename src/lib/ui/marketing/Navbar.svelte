<script lang="ts">
	import Dropdown from '$lib/ui/components/Dropdown.svelte';
	import { Menu } from 'lucide-svelte';
	import ThemeController from '$lib/ui/components/ThemeController.svelte';
	import Logo from '$lib/ui/marketing/Logo.svelte';
</script>

<div class="fixed z-50 w-full bg-base-100">
	<div class="container navbar">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl normal-case"><Logo/> Launch Leopard</a>
		</div>
		<nav class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li><a href="#features">Features</a></li>
				<li><a href="#pricing">Pricing</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ul>
		</nav>
		<div class="navbar-end gap-2">
			<div class="hidden sm:block">
				<ThemeController />
			</div>
			<a href="/signin" class="btn btn-primary">Sign in</a>
			<Dropdown class="btn-square dropdown-end dropdown-bottom btn-md lg:hidden">
				<div slot="button"><Menu size="1em" /></div>
				<div slot="content">
					<ul class="menu px-1">
						<li><a href="#features">Features</a></li>
						<li><a href="#pricing">Pricing</a></li>
						<li><a href="#faq">FAQ</a></li>
					</ul>
				</div>
			</Dropdown>
		</div>
	</div>
</div>
