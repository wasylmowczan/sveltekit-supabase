<script lang="ts">
	import { page } from '$app/stores';
	export let href = '/';
	export let label = 'Item';
	export let icon: any | undefined = undefined;
	export let activeOnSubPaths = true;
</script>

{#if activeOnSubPaths}
	<li>
		<a {href} class="{$page.url.pathname?.startsWith(href) ? 'active font-semibold' : ''} ">
			{#if icon}
				<svelte:component this={icon} size="1em" />
			{/if}
			<span>
				{label}
			</span>
		</a>
	</li>
{:else}
	<li>
		<a
			{href}
			class="{$page.url.pathname === href || $page.url.pathname === href + '/'
				? 'active font-semibold'
				: ''} ">
			{#if icon}
				<svelte:component this={icon} size="1em" />
			{/if}
			<span>
				{label}
			</span>
		</a>
	</li>
{/if}
