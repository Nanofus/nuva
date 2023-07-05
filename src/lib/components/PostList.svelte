<script lang="ts">
	import { LOCALE } from '$lib/config';
	import type { PostMeta } from '$lib/types';
	import List from "$lib/components/reusable/List.svelte";

	export let posts: PostMeta[];
</script>

<List>
		<li class="list-header">
			<span class="link">Viesti (kommentteja)</span>
			<span class="date">Julkaisupäivä</span>
			<span class="authors">Kirjoittajat</span>
		</li>
	{#each posts as post}
		<li>
			<span class="link"><a href="/posts/{post.slug}">{post.title}</a> ({post.commentCount ? post.commentCount : 0})</span>
			<time class="date">{post.date.toLocaleDateString(LOCALE)}</time>
			<span class="authors">{post.authors.join(', ')}</span>
		</li>
	{/each}
</List>

<style lang="scss">
	li {
		width: 100%;
		display: flex;
	}

	.link {
		flex: 7;

		a {
			margin-right: 0.5rem;
		}
	}

	.date {
		flex: 2;
	}

	.authors {
		flex: 3;
	}

	.list-header {
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
</style>
