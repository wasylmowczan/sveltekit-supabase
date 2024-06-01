<script lang="ts">
	import '../app.css';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { themeStore } from '$lib/stores/themeStore';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	// Set theme from page data, which gets value from cookie (see root +layout.server.ts)
	$themeStore = $page.data.theme;

	const defaultMetaTags = {
		title: 'YaDomopoga - Місце волонтерської допомоги.',
		description:
			'Для осіб які шукають допомогу та волонтерів, які готові надати її. Зареєструйтесь та знайдіть волонтера або допоможіть іншим.',
		keywords: 'банки, моно, волонтери, допомога',
		ogimage: `${$page.url.origin}/images/ogimage.png`
	};
</script>

<svelte:head>
	<title>{$page.data.meta?.title ?? defaultMetaTags.title}</title>
	<meta name="description" content={$page.data.meta?.description ?? defaultMetaTags.description} />
	<meta name="keywords" content={$page.data.meta?.keywords ?? defaultMetaTags.keywords} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={$page.data.meta?.title ?? defaultMetaTags.title} />
	<meta
		property="og:description"
		content={$page.data.meta?.description ?? defaultMetaTags.description} />
	<meta property="og:image" content={$page.data.meta?.ogimage ?? defaultMetaTags.ogimage} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@yourtwittername" />
	<link rel="canonical" href={$page.url.href} />
</svelte:head>

<!-- 
	Single checkbox input for theme, always checked and hidden.
	Value is themeStore with theme name as value
	When themeStore is update, this input is updated
	See ThemeController component for more info
-->
<input type="checkbox" name="theme" class="theme-controller hidden" checked value={$themeStore} />

<slot />
