<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
</script>

<svelte:head>
  <title>{getPageTitle("Profiili")}</title>
  <meta content={"Profiili"} property="og:title" />
  <meta content={getPageUrl(`profile`)} property="og:url" />
</svelte:head>

<h1>Profiili</h1>
<Login />
