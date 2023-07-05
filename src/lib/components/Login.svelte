<script lang="ts">
  import { getAuthInfo, login, logout } from "$lib/database";
  import { loginInfo } from "$lib/stores";
  import { onMount } from "svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toast } from "@zerodevx/svelte-toast";

  let loggedIn: boolean | null = null;
  let password = "";
  let username = "";
  let loggedInUsername;

  $: loggedIn ? loggedInUsername = <string>getAuthInfo()?.username : loggedInUsername = "";

  onMount(() => {
    loginInfo.subscribe((loginInfo) => loggedIn = !!loginInfo);
  });

  let handleLogin = async () => {
    if (!username || !password) {
      toast.push("Täytä molemmat kentät.");
      return;
    }
    await login(fetch, username, password);
  }
</script>

<div class="login-area">
  {#if loggedIn === null}
    <LoadingSpinner />
  {:else if !loggedIn}
    <Form>
      <Input label="Käyttäjätunnus" name="username" bind:value={username} />
      <Input label="Salasana" name="password" type="password" bind:value={password} />
      <Button on:click={handleLogin}>Kirjaudu sisään</Button>
    </Form>
  {:else if loggedIn}
    <span>{loggedInUsername}</span>
    <Button on:click={() => logout()}>Kirjaudu ulos</Button>
  {/if}
</div>
