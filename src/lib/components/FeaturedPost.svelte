<script lang="ts">
  import type { PostMeta } from '$lib/types';
  import AuthorList from '$lib/components/reusable/AuthorList.svelte';
  import { clientConfig } from '$lib/client/config';

  interface Props {
    postMeta: PostMeta;
  }

  let { postMeta }: Props = $props();
</script>

<div
  class="featured-post"
  style="background-image: {postMeta.featuredImage
    ? `url(${postMeta.featuredImage})`
    : `url(${clientConfig.defaultFeaturedImage})`}"
>
  <h1><a href="/posts/{postMeta.slug}">{@html postMeta.title}</a></h1>
  <p class="authors">
    <AuthorList --author-link-color="var(--text-dark)" authors={postMeta.coAuthors} />
  </p>
  <div>{@html postMeta.description ? postMeta.description : ''}</div>
</div>

<style>
  .featured-post {
    background-position: center;
    background-size: cover;
    color: var(--text-dark);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
    text-shadow: var(--banner-shadow);
    display: flex;
    flex-direction: column;
    flex: 1;
    box-sizing: border-box;
    padding: 1.5rem 4rem 2.5rem;
    min-height: var(--min-height, 24rem);
    border-radius: calc(var(--border-radius) * 2);

    h1 {
      margin-bottom: 0;
      text-align: left;
      text-shadow: var(--banner-shadow);
      line-height: var(--line-height, initial);

      a {
        font-size: var(--header-size, 0.75em);
      }
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
  }
</style>
