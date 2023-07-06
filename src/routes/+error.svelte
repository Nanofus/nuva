<script>
  import { page } from "$app/stores";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
</script>

<PageHead title={$page.status} />

<h1>Virhe {$page.status}</h1>
