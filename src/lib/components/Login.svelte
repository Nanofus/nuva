<script lang="ts">
	import { login, logout } from '$lib/util/database';
	import { loginInfo } from '$lib/util/stores';
	import { onMount } from 'svelte';
	import Button from '$lib/components/reusable/Button.svelte';
	import Input from '$lib/components/reusable/Input.svelte';
	import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
	import Form from '$lib/components/reusable/Form.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { toastSettings } from '$lib/util/util';
	import { browser } from '$app/environment';
	import { t } from '$lib/translations';

	let loggedIn: boolean | null = null;
	let passwordInput = '';
	let usernameInput = '';
	let submitted = false;

	onMount(() => {
		loginInfo.subscribe((loginInfo) => (loggedIn = !!loginInfo));
	});

	const handleLogin = async () => {
		if (!usernameInput || !passwordInput) {
			toast.push(t.components.login.fillBothFields, toastSettings.error);
			return;
		}
		await login(fetch, usernameInput, passwordInput);
		submitted = false;
	};
</script>

<div class="login-area">
	{#if loggedIn === null}
		{#if browser}
			<LoadingSpinner />
		{:else}
			<p>{t.components.login.cantUseWithoutJs}</p>
		{/if}
	{:else if !loggedIn}
		<Form vertical={true} on:submit={() => (submitted = true)}>
			<Input label={t.components.login.username} name="username" bind:value={usernameInput} />
			<Input
				label={t.components.login.password}
				name="password"
				type="password"
				bind:value={passwordInput}
			/>
			{#if !submitted}
				<Button on:click={handleLogin}>{t.components.login.login}</Button>
			{:else}
				<LoadingSpinner />
			{/if}
		</Form>
	{:else if loggedIn}
		<div class="user-info">
			<Button on:click={() => logout()}>{t.components.login.logout}</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.login-area {
		width: calc(var(--article-max-width) / 2);
	}

	.user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
