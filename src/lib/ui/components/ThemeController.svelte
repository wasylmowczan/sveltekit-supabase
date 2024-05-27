<script lang="ts">
	import { browser } from '$app/environment';
	import { themeStore } from '$lib/stores/themeStore';
	import Dropdown from '$lib/ui/components/Dropdown.svelte';
	import { ChevronDown } from 'lucide-svelte';

	// Set selected theme based on theme store
	let selectedTheme: string = $themeStore;

	function setThemeCookie() {
		// Update theme cookie
		document.cookie = `theme=${selectedTheme};path=/;max-age=2147483647`;

		// Update theme store, so theme is applied to app (see root +layout.svelte)
		$themeStore = selectedTheme;
	}

	// Function needs access to document for setting cookie, so only run in browser
	// This is run evertime the selectedTheme changes
	$: if (selectedTheme && browser) {
		setThemeCookie();
	}
</script>

<Dropdown>
	<div slot="button" class="flex items-center gap-1">Theme <ChevronDown size="1em"/></div>
	<div slot="content">
		<ul class="menu px-1">
			<!-- Add your themes here, value attribute must correspond to theme name -->
			<li>
				<input
					type="radio"
					bind:group={selectedTheme}
					class="btn btn-ghost btn-sm btn-block justify-start"
					aria-label="System"
					value="default" />
			</li>
			<li>
				<input
					type="radio"
					bind:group={selectedTheme}
					class="btn btn-ghost btn-sm btn-block justify-start"
					aria-label="Light"
					value="light" />
			</li>
			<li>
				<input
					type="radio"
					bind:group={selectedTheme}
					class="btn btn-ghost btn-sm btn-block justify-start"
					aria-label="Dark"
					value="dark" />
			</li>
		</ul>
	</div>
</Dropdown>
