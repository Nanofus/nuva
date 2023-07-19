<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import { onMount } from "svelte";
  import { getAuthInfo } from "$lib/database";

  let userInfo = null;

  onMount(() => {
    userInfo = getAuthInfo();
  });
</script>

<svelte:head>
  <title>{getPageTitle("Profiili")}</title>
  <meta content={"Profiili"} property="og:title" />
  <meta content={getPageUrl(`profile`)} property="og:url" />
</svelte:head>

<h1>Profiili</h1>
{#if userInfo}
  <ul>
    <li>Käyttäjä: {userInfo.name}</li>
  </ul>
{/if}
<Login />
