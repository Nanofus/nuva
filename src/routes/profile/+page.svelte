<script lang="ts">
  import Login from '$lib/components/Login.svelte';
  import { getPageTitle, getPageUrl, loadSetting, saveSetting } from '$lib/client/util';
  import { auth } from '$lib/client/stores';
  import SettingItem from '$lib/components/reusable/SettingItem.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import { clientConfig } from '$lib/client/config';
  import { t } from '$lib/client/localization';

  let volume = $state(loadSetting('volume') || clientConfig.defaultVolume);

  $effect(() => {
    if (volume) saveSetting('volume', volume);
  });
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.profile.title)}</title>
  <meta content={t.pages.profile.title} property="og:title" />
  <meta content={getPageUrl('profile')} property="og:url" />
</svelte:head>

<h1>{t.pages.profile.title}</h1>
{#if $auth}
  <Settings>
    <SettingItem>
      <label for="displayName">{t.settings.user}</label>
      <span id="displayName">{$auth.displayName}</span>
    </SettingItem>
    <SettingItem>
      <div class="input-wrapper">
        <label for="volume">{t.settings.volume}</label>
        <input id="volume" class="volume-bar" type="range" min="0" max="100" bind:value={volume} />
      </div>
    </SettingItem>
  </Settings>
{/if}
<div class="vertically-separated">
  <Login />
</div>

<style lang="scss">
  .input-wrapper {
    width: 12rem;
  }
</style>
