<script lang="ts">
	import Dropdown from '$lib/ui/components/Dropdown.svelte';
	import { Menu } from 'lucide-svelte';
	import ThemeController from '$lib/ui/components/ThemeController.svelte';
</script>

<div class="fixed z-50 w-full bg-base-100">
	<div class="container navbar">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl normal-case">Я 🤲 Допомога</a>
		</div>
		<div class="navbar-end gap-2">
			<div class="hidden sm:block">
				<ThemeController />
			</div>
			<a href="/signin" class="btn btn-primary">Вхід</a>
		</div>
	</div>
</div>
