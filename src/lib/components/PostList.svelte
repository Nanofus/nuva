<script lang="ts">
	import { LOCALE } from '$lib/config';
	import type { PostMeta } from '$lib/types';

	export let posts: PostMeta[];
</script>

<ul class="post-list">
	{#each posts as post}
		<li>
			<span class="link"><a href="/posts/{post.slug}">{post.title}</a> ({post.commentCount})</span>
			<span class="date">{post.date.toLocaleDateString(LOCALE)}</span>
			<span class="authors">{post.authors.join(', ')}</span>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
	}
</style>
