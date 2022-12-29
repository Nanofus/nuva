<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { isLoggedIn } from '$lib/database';
	import Login from '$lib/components/Login.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Header from '$lib/components/Header.svelte';

	let loggedIn: boolean;

	onMount(() => {
		loggedIn = isLoggedIn();
	});
</script>

<div id="app">
	<Login />
	<Header />
	<Navigation />
	<slot />
	<SvelteToast options={{ reversed: true, intro: { y: -20 } }} />
</div>

<style lang="scss" global>
	@import '../lib/style/style.scss';
</style>
