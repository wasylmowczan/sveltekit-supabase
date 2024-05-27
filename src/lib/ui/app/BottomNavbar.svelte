<script lang="ts">
	import { Home, Bot } from 'lucide-svelte';
</script>

<div class="btm-nav fixed bottom-0 border-t border-base-300 bg-base-200">
	<a href="/dashboard">
		<Home size="1em" />
		<span class="btm-nav-label">Home</span>
	</a>
	<a href="/ai">
		<Bot size="1em" />
		<span class="btm-nav-label">AI</span>
	</a>
</div>
