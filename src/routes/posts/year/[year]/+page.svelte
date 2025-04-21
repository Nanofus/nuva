<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import type { PostListByYearResponse } from '$lib/types';
  import { getPageTitle, getPageUrl } from '$lib/client/util';

  interface Props {
    data: PostListByYearResponse;
  }

  let { data = $bindable() }: Props = $props();

  let previousYear = data.year - 1;
  let nextYear = data.year + 1;
</script>

<svelte:head>
  <title>{getPageTitle(`${data.year}`)}</title>
  <meta content={`${data.year}`} property="og:title" />
  <meta content={getPageUrl('/posts/year/' + data.year)} property="og:url" />
</svelte:head>

<div class="year-header">
  <h3>
    <a href="/posts/year/{previousYear}">{previousYear}</a>
  </h3>
  <div>
    <h1>{data.year}</h1>
  </div>
  <h3>
    <a href="/posts/year/{nextYear}">{nextYear}</a>
  </h3>
</div>
<PostList posts={data.posts} reverse={true} />

<style lang="scss">
  .year-header {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    
    h3 {
      a {
        color: var(--link);

        &:hover {
          text-decoration: none;
          color: var(--link-hover);
        }
      }
    }
  }
</style>