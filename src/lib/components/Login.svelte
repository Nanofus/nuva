<script lang="ts">
	import { onMount } from 'svelte';
	import { login, logout, isLoggedIn } from '$lib/api';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { loginInfo } from '$lib/stores';
	let loggedIn = null;
	let password = '';
	let username = '';

	loginInfo.subscribe((loginInfo) => {
		loggedIn = loginInfo ? true : false;
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
		<button on:click={async () => await login(username, password)}>Login</button>
	{:else if loggedIn}
		<button on:click={() => logout()}>Logout</button>
	{/if}
</div>

<style lang="scss">
	.login-area {
		margin: 1rem;
	}
</style>
