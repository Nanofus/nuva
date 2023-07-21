<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl, loadVolume, saveVolume } from "$lib/util";
  import { onMount } from "svelte";
  import { loginInfo } from "$lib/stores";
  import SettingItem from "$lib/components/reusable/SettingItem.svelte";
  import Settings from "$lib/components/Settings.svelte";

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
<Settings>
  {#if userInfo}
    <SettingItem label="Käyttäjä"><span>{userInfo.displayName}</span></SettingItem>
    <SettingItem label="Äänenvoimakkuus"><input class="volume-bar"
                                                type="range"
                                                min="0"
                                                max="100"
                                                bind:value={volume}></SettingItem>
  {/if}
</Settings>
<div class="login-area">
  <Login />
</div>

<style lang="scss">
  .login-area {
    margin-top: var(--vertical-separation-margin);
  }
</style>