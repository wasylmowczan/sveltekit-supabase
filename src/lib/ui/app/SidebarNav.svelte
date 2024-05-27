<script lang="ts">
	import { page } from '$app/stores';
	import MenuItem from '$lib/ui/app/MenuItem.svelte';
	import MenuCategory from '$lib/ui/app/MenuCategory.svelte';
	import { Home, Bot, User, CreditCard, ChevronUp } from 'lucide-svelte';
	import Dropdown from '$lib/ui/components/Dropdown.svelte';
	import Logo from '$lib/ui/marketing/Logo.svelte';
</script>

<div
	class="sticky top-0 flex h-screen w-56 flex-col justify-between border-r border-base-300 bg-base-200/70">
	<div>
		<div class="px-2">
			<span class="flex items-center gap-2 px-3 pt-4 text-sm font-semibold">
				<span class="text-xl">
					<Logo />
				</span>

				App Name
			</span>
		</div>
		<ul class="menu">
			<MenuItem href="/dashboard" label="Dashboard" icon={Home} />
			<MenuCategory label="AI Demos" icon={Bot}>
				<MenuItem href="/ai/chat" label="Chat" />
				<MenuItem href="/ai/image" label="Text to Image" />
				<MenuItem href="/ai/speech-to-text" label="Speech to Text" />
				<MenuItem href="/ai/text-to-speech" label="Text to Speech" />
			</MenuCategory>
		</ul>
	</div>
	<div class="">
		<ul class="menu">
			<MenuItem href="/account" label="Account" icon={User} activeOnSubPaths={false} />
			<MenuItem href="/account/billing" label="Billing" icon={CreditCard} />
		</ul>
		<div class="max-w-[14rem]">
			<Dropdown class="dropdown-top w-full">
				<div slot="button" class="flex items-center gap-1 text-xs normal-case">
					<span class="w-40 truncate">
						{$page.data.session?.user.email}
					</span>
					<ChevronUp size="1em" />
				</div>
				<div slot="content">
					<ul class="menu">
						<li>
							<a href="/account"> Account </a>
						</li>
						<li>
							<form action="/account?/signOut" method="post" class="block p-0">
								<button type="submit" class="w-full px-4 py-2 text-left"> Sign out </button>
							</form>
						</li>
					</ul>
				</div>
			</Dropdown>
		</div>
	</div>
</div>
