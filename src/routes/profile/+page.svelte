<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl, loadSetting, saveSetting } from "$lib/util";
  import { onMount } from "svelte";
  import { loginInfo } from "$lib/stores";
  import SettingItem from "$lib/components/reusable/SettingItem.svelte";
  import Settings from "$lib/components/Settings.svelte";
  import { DEFAULT_VOLUME } from "$lib/config";
  import { t } from "$lib/translations";

  let userInfo = null;
  let volume = loadSetting("volume") || DEFAULT_VOLUME;

  onMount(() => {
    loginInfo.subscribe(info => (userInfo = info));
  });

  $: volume && saveSetting("volume", volume);
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.profile.title)}</title>
  <meta content={t.pages.profile.title} property="og:title" />
  <meta content={getPageUrl(`profile`)} property="og:url" />
</svelte:head>

<h1>{t.pages.profile}</h1>
{#if userInfo}
  <Settings>
    <SettingItem label={t.settings.user}><span>{userInfo.displayName}</span></SettingItem>
    <SettingItem label={t.settings.volume}><input class="volume-bar"
                                                             type="range"
                                                             min="0"
                                                             max="100"
                                                             bind:value={volume}></SettingItem>
  </Settings>
{/if}
<div class="vertically-separated">
  <Login />
</div>
