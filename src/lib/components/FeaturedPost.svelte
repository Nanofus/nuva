<script lang="ts">
  import type { PostMeta } from "$lib/types";

  export let postMeta: PostMeta;
</script>

<div id="featured-post"
     style="background-image: {postMeta.featuredImage ? `url(${postMeta.featuredImage})` : `var(--featured-background)` }">
  <div class="title">
    <h1><a href="/posts/{postMeta.slug}">{postMeta.title}</a></h1>
    <p class="authors">{postMeta.authors.join(', ')}</p>
  </div>
  <p>{postMeta.description}</p>
</div>

<style lang="scss">
  #featured-post {
    background-position: center;
    background-size: cover;
    filter: grayscale(80%);
    color: var(--main-nav-color);
    display: flex;
    flex-direction: column;

    .title {
      display: flex;
    }

    h1 {
      text-align: left;
      flex: 2 1 auto;
    }

    .authors {
      flex: 1 1 auto;
      text-align: right;
      font-style: italic;
      color: var(--main-nav-color);
    }

    &:hover {
      text-decoration: none;
    }

    a {
      color: var(--main-nav-color);
    }

    margin-top: var(--vertical-separation-margin);
    padding: 2rem;
    border-radius: var(--border-radius);
    max-width: var(--article-max-width);
  }
</style>