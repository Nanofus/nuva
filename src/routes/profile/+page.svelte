<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl, loadVolume, saveVolume } from "$lib/util";
  import { onMount } from "svelte";
  import { loginInfo } from "$lib/stores";

  let userInfo = null;
  let volume = loadVolume();

  onMount(() => {
    loginInfo.subscribe(info => (userInfo = info));
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
    <li>Käyttäjä: <b>{userInfo.displayName}</b></li>
    <li>Äänenvoimakkuus:
      <input class="volume-bar"
             type="range"
             min="0"
             max="100"
             bind:value={volume}></li>
  </ul>
{/if}
<Login />
