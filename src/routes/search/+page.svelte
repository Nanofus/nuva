<script lang="ts">
  import Search from '$lib/components/Search.svelte';
  import { getPageTitle, getPageUrl } from '$lib/client/util';
  import { t } from '$lib/client/localization';
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.search.title)}</title>
  <meta content={t.pages.search.title} property="og:title" />
  <meta content={getPageUrl('search')} property="og:url" />
</svelte:head>

<h1>{t.pages.search.title}</h1>
<Search />

<style lang="scss">
</style>
