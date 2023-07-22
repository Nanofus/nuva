<script lang="ts">
  import { getAuthInfo, login, logout } from "$lib/database";
  import { loginInfo } from "$lib/stores";
  import { onMount } from "svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { toastThemes } from "$lib/util";
  import { browser } from "$app/environment";

  let loggedIn: boolean | null = null;
  let passwordInput = "";
  let usernameInput = "";
  let userDisplayName;
  let submitted = false;

  onMount(() => {
    loginInfo.subscribe((loginInfo) => loggedIn = !!loginInfo);
  });

  $: loggedIn ? userDisplayName = <string>getAuthInfo()?.displayName : userDisplayName = "";

  const handleLogin = async () => {
    if (!usernameInput || !passwordInput) {
      toast.push("Täytä molemmat kentät", toastThemes.error);
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
      <p>Ei käytettävissä ilman JavaScriptia.</p>
    {/if}
  {:else if !loggedIn}
    <Form vertical="true" on:submit={() => submitted = true}>
      <Input label="Käyttäjätunnus" name="username" bind:value={usernameInput} />
      <Input label="Salasana" name="password" type="password" bind:value={passwordInput} />
      {#if !submitted}
        <Button on:click={handleLogin}>Kirjaudu sisään</Button>
      {:else}
        <LoadingSpinner />
      {/if}
    </Form>
  {:else if loggedIn}
    <div class="user-info">
      <Button on:click={() => logout()}>Kirjaudu ulos</Button>
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