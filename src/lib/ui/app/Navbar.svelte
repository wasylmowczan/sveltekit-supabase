<script lang="ts">
	import { page } from '$app/stores';
	import Dropdown from '$lib/ui/components/Dropdown.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import Logo from '$lib/ui/marketing/Logo.svelte';
</script>

<div class="navbar fixed top-0 z-50 w-full border-b border-base-300 bg-base-200">
	<div class="flex w-full items-center justify-between">
		<a href="/dashboard" class="btn btn-ghost text-xl normal-case"><Logo /></a>
		<Dropdown class="dropdown-bottom">
			<div slot="button" class="flex items-center gap-1 truncate text-xs normal-case">
				<span class="w-40 truncate">
					{$page.data.session?.user.email}
				</span>
				<ChevronDown size="1em" />
			</div>
			<div slot="content">
				<ul class="menu">
					<li>
						<a href="/account"> Акаунт 👩‍💻</a>
					</li>
					<li>
						<form action="/account?/signOut" method="post" class="block p-0">
							<button type="submit" class="w-full px-4 py-2 text-left"> Вийти 🫡 </button>
						</form>
					</li>
				</ul>
			</div>
		</Dropdown>
	</div>
</div>
