<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { isLoggedIn } from '$lib/api';
	import Login from '$lib/components/Login.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let loggedIn: boolean;

	onMount(() => {
		loggedIn = isLoggedIn();
	});
</script>

<div id="app">
	{#if loggedIn === undefined}
		<LoadingSpinner />
	{:else if loggedIn === false}
		<Login />
	{/if}
    <h1>Klaanon Nuva</h1>
	<Navigation />
	<slot />
	<SvelteToast options={{ reversed: true, intro: { y: -50 } }} />
</div>

<style lang="scss" global>
	@import '../lib/style/style.scss';
</style>
