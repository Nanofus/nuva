<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { isLoggedIn } from '$lib/database';
	import Login from '$lib/components/Login.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Header from '$lib/components/Header.svelte';

    // Global styles
    import '../lib/style/style.scss';

	let loggedIn: boolean;

	onMount(() => {
		loggedIn = isLoggedIn();
	});
</script>

<Login />
<Header />
<Navigation />
<slot />
<SvelteToast options={{ reversed: true, intro: { y: -20 } }} />
