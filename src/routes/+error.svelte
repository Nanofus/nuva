<script>
  import { page } from "$app/stores";
  import { getPageTitle } from "$lib/util";
</script>

<svelte:head>
  <title>{getPageTitle("Virhe")}</title>
</svelte:head>

<h1>Virhe {$page.status}</h1>
