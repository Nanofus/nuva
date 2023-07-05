<script lang="ts">
	import type { Post } from '$lib/types';
	import PostView from '$lib/components/PostView.svelte';
  import Head from "$lib/components/reusable/Head.svelte";
	import PageContent from "$lib/components/reusable/PageContent.svelte";

	export let data: Post;
</script>

<Head title={data.title} />

<PageContent>
	{#if data.content}
		<PostView post={data} />
	{:else}
		<h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
	{/if}
</PageContent>
