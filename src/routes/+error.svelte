<script>
  import { page } from "$app/stores";
  import { getPageTitle } from "$lib/util";
  import { t } from "$lib/translations";
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.error.title)}</title>
</svelte:head>

<h1>{t.pages.error.title} {$page.status}</h1>
