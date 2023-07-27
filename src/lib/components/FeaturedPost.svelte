<script lang="ts">
	import type { PostMeta } from '$lib/util/types';
	import { getRandomBannerUrl } from '$lib/util/util';

	export let postMeta: PostMeta;
</script>

<div
	id="featured-post"
	style="background-image: {postMeta.featuredImage
		? `url(${postMeta.featuredImage})`
		: getRandomBannerUrl(1)}"
>
	<p class="authors">
		<span class="author-list">
			{#each postMeta.coAuthors as author}
				<a href="/authors/{encodeURI(author)}">{author}</a>
			{/each}
		</span>
	</p>
	<h1><a href="/posts/{postMeta.slug}">{@html postMeta.title}</a></h1>
	<p>{@html postMeta.description ? postMeta.description : ''}</p>
</div>

<style lang="scss">
	#featured-post {
		background-position: center;
		background-size: cover;
		filter: grayscale(80%);
		color: var(--text-dark);
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
		text-shadow: var(--banner-shadow);
		display: flex;
		flex-direction: column;

		h1 {
			margin-top: 0;
			margin-bottom: 0;
			text-align: left;
			text-shadow: var(--banner-shadow);
		}

		.authors {
			font-style: italic;
			color: var(--text-dark);
		}

		&:hover {
			text-decoration: none;
		}

		a {
			color: var(--text-dark);
		}

		padding: 2rem;
		border-radius: var(--border-radius);
		max-width: var(--article-max-width);
	}
</style>
