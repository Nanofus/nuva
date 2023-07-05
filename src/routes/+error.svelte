<script>
	import { page } from '$app/stores';
  import Head from "$lib/components/reusable/Head.svelte";
</script>

<Head title={$page.status} />

<h1>Virhe {$page.status}</h1>
