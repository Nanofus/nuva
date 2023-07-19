<script lang="ts">
  import Search from "$lib/components/Search.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
</script>

<svelte:head>
  <title>{getPageTitle("Haku")}</title>
  <meta content={"Haku"} property="og:title" />
  <meta content={getPageUrl(`search`)} property="og:url" />
</svelte:head>

<h1>Haku</h1>
<Search />

<style lang="scss">
</style>

