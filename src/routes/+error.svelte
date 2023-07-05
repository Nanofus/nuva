<script>
  import { page } from "$app/stores";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import PageContent from "$lib/components/reusable/PageContent.svelte";
</script>

<PageHead title={$page.status} />

<PageContent>
  <h1>Virhe {$page.status}</h1>
</PageContent>
