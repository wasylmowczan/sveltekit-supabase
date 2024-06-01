<script lang="ts">
	import MenuItem from '$lib/ui/app/MenuItem.svelte';
	import { Home, PersonStandingIcon } from 'lucide-svelte';
</script>

<div
	class="sticky top-0 flex h-screen w-56 flex-col justify-between border-r border-base-300 bg-base-200/70">
	<div>
		<div class="px-2">
			<span class="flex items-center gap-2 px-3 pt-4 text-sm font-semibold">
				<span class="text-xl">
					<!-- <Logo /> -->
				</span>
				<a href="/"> Я 🤲 Допомога </a></span>
		</div>
		<ul class="menu">
			<MenuItem href="/dashboard" label="Банки" icon={Home} />
			<!-- <MenuItem href="/volunteers" label="Волонтери" icon={PersonStandingIcon} /> -->
		</ul>
	</div>
	<div class="">
		<ul class="menu">
			<MenuItem href="/account" label="Акаунт 👩‍💻" activeOnSubPaths={false} />
			<form action="/account?/signOut" method="post" class="block p-0">
				<button type="submit" class="w-full px-4 py-2 text-left"> Вийти 🫡 </button>
			</form>
		</ul>
		<br />
	</div>
</div>
