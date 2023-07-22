<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl, loadSetting, saveSetting } from "$lib/util";
  import { onMount } from "svelte";
  import { loginInfo } from "$lib/stores";
  import SettingItem from "$lib/components/reusable/SettingItem.svelte";
  import Settings from "$lib/components/Settings.svelte";
  import { DEFAULT_VOLUME } from "$lib/config";

  let userInfo = null;
  let volume = loadSetting("volume") || DEFAULT_VOLUME;

  onMount(() => {
    loginInfo.subscribe(info => (userInfo = info));
  });

  $: volume && saveSetting("volume", volume);
</script>

<svelte:head>
  <title>{getPageTitle("Profiili")}</title>
  <meta content={"Profiili"} property="og:title" />
  <meta content={getPageUrl(`profile`)} property="og:url" />
</svelte:head>

<h1>Profiili</h1>
{#if userInfo}
  <Settings>
    <SettingItem label="Käyttäjä"><span>{userInfo.displayName}</span></SettingItem>
    <SettingItem label="Äänenvoimakkuus"><input class="volume-bar"
                                                type="range"
                                                min="0"
                                                max="100"
                                                bind:value={volume}></SettingItem>
  </Settings>
{/if}
<div class="vertically-separated">
  <Login />
</div>
