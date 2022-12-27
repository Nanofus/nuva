<script lang="ts">
	import { login } from '$lib/api';
	let password = '';
	let username = '';
</script>

<main class="login-area">
	<label for="username">Käyttäjätunnus</label>
	<input name="username" type="username" bind:value={username} />
	<label for="password">Salasana</label>
	<input name="password" type="password" bind:value={password} />
	<button on:click={async () => await login(username, password)}>Login</button>
</main>

<style lang="scss">
	.login-area {
		margin: 1rem;
	}
</style>
