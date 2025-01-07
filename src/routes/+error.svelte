<script>
  import { page } from '$app/state';
  import { getPageTitle } from '$lib/util/util';
  import { t } from '$lib/util/translations';
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.error.title)}</title>
</svelte:head>

<h1>{t.pages.error.title} {page.status}</h1>
