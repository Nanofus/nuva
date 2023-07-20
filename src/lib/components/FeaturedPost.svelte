<script lang="ts">
  import type { PostMeta } from "$lib/types";
  import { getRandomBannerUrl } from "$lib/util";

  export let postMeta: PostMeta;
</script>

<div id="featured-post"
     style="background-image: {postMeta.featuredImage ? `url(${postMeta.featuredImage})` : getRandomBannerUrl(1) }">
  <p class="authors">{postMeta.authors.join(', ')}</p>
  <h1><a href="/posts/{postMeta.slug}">{postMeta.title}</a></h1>
  <p>{postMeta.description ? postMeta.description : ""}</p>
</div>

<style lang="scss">
  #featured-post {
    background-position: center;
    background-size: cover;
    filter: grayscale(80%);
    color: var(--main-nav-color);
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
      color: var(--main-nav-color);
    }

    &:hover {
      text-decoration: none;
    }

    a {
      color: var(--main-nav-color);
    }

    padding: 2rem;
    border-radius: var(--border-radius);
    max-width: var(--article-max-width);
  }
</style>