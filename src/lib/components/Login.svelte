<script lang="ts">
	import { login, logout } from '$lib/database';
	import { loginInfo } from '$lib/stores';
	import { onMount } from 'svelte';
	import Button from "$lib/components/reusable/Button.svelte";
	let loggedIn: boolean | null = null;
	let password = '';
	let username = '';

	onMount(() => {
		loginInfo.subscribe((loginInfo) => {
			loggedIn = loginInfo ? true : false;
		});
	});
</script>

<div class="login-area">
	{#if loggedIn === null}
		<div>Ladataan...</div>
	{:else if !loggedIn}
		<label for="username">Käyttäjätunnus</label>
		<input name="username" type="username" bind:value={username} />
		<label for="password">Salasana</label>
		<input name="password" type="password" bind:value={password} />
		<Button on:click={async () => await login(username, password)}>Login</Button>
	{:else if loggedIn}
		<Button on:click={() => logout()}>Logout</Button>
	{/if}
</div>

<style lang="scss">
	.login-area {
		margin: 1rem;
		position: fixed;
		top: 1rem;
		right: 1rem;
		width: auto;
		background-color: rgba(255,255,255,0.8);
		padding: 0.5em;
	}
</style>
