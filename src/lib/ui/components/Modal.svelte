<script lang="ts">
	export let dialog: HTMLDialogElement;
	import { X } from 'lucide-svelte';
</script>

<dialog id="modal" class="modal w-full" bind:this={dialog}>
	<div class="modal-box w-11/12 max-w-3xl">
		<form method="dialog">
			<button
				type="submit"
				class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 focus-visible:outline-none focus-visible:ring-0"
				><X size="1em" /></button>
		</form>
		<div>
			<slot />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
