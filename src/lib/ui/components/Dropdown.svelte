<script lang="ts">
	import clickOutside from '$lib/clickOutside';

	let dropdown: HTMLDetailsElement;
</script>

<details class="dropdown {$$props.class}" bind:this={dropdown}>
	<summary
		class="btn btn-ghost flex items-center gap-2"
		aria-details="dropdown"
		use:clickOutside={() => {
			dropdown.open = false;
		}}>
		<slot name="button" />
	</summary>
	<div class="menu dropdown-content rounded-box w-52 bg-base-100 p-0 shadow">
		<slot name="content" />
	</div>
</details>
