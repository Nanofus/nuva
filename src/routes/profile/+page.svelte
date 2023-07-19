<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl, saveVolume } from "$lib/util";
  import { onMount } from "svelte";
  import { getAuthInfo } from "$lib/database";

  let userInfo = null;
  let volume;

  onMount(() => {
    userInfo = getAuthInfo();
    volume = userInfo.volume;
  });

  $: volume && saveVolume(volume);
</script>

<svelte:head>
  <title>{getPageTitle("Profiili")}</title>
  <meta content={"Profiili"} property="og:title" />
  <meta content={getPageUrl(`profile`)} property="og:url" />
</svelte:head>

<h1>Profiili</h1>
{#if userInfo}
  <ul>
    <li>Käyttäjä: {userInfo.displayName}</li>
    <li>Äänenvoimakkuus:
      <input class="volume-bar"
             type="range"
             min="0"
             max="100"
             bind:value={volume}></li>
  </ul>
{/if}
<Login />
