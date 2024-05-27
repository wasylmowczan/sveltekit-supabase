<script lang="ts">
	export let label = 'Item';
	export let icon: any = undefined;
</script>

<li>
	<details open>
		<summary>
			{#if icon}
				<svelte:component this={icon} size="1em" />
			{/if}
			<span>
				{label}
			</span>
		</summary>
		<ul>
			<slot />
		</ul>
	</details>
</li>
