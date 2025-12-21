<script lang="ts">
  import { login, logout } from '$lib/client/auth';
  import { auth } from '$lib/client/stores';
  import { browser } from '$app/environment';
  import Button from '$lib/components/reusable/Button.svelte';
  import Input from '$lib/components/reusable/Input.svelte';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import Form from '$lib/components/reusable/Form.svelte';
  import { toast } from '@zerodevx/svelte-toast';
  import { toastSettings } from '$lib/client/util';
  import { t } from '$lib/client/localization';

  let passwordInput = $state('');
  let usernameInput = $state('');
  let submitted = $state(false);

  const handleLogin = async () => {
    if (!usernameInput || !passwordInput) {
      toast.push(t.components.login.fillBothFields, toastSettings.error);
      return;
    }
    await login(usernameInput, passwordInput);
    submitted = false;
  };
</script>

<div class="login-area">
  {#if !$auth && browser}
    <Form
      vertical={true}
      onsubmit={(e: Event) => {
        e.preventDefault();
        submitted = true;
      }}
    >
      <Input label={t.components.login.username} name="username" bind:value={usernameInput} />
      <Input
        label={t.components.login.password}
        name="password"
        type="password"
        bind:value={passwordInput}
      />
      {#if !submitted}
        <Button onclick={handleLogin}>{t.components.login.login}</Button>
      {:else}
        <LoadingSpinner />
      {/if}
    </Form>
  {:else}
    <div class="user-info">
      <Button onclick={() => logout()}>{t.components.login.logout}</Button>
    </div>
  {/if}
</div>

<style>
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
