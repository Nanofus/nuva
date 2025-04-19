<script>
  import { page } from '$app/state';
  import { getPageTitle } from '$lib/client/util.js';
  import { t } from '$lib/client/localization.ts';
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.error.title)}</title>
</svelte:head>

<h1>{t.pages.error.title} {page.status}</h1>
