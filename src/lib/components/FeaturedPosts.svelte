<script lang="ts">
  import { getConfig } from '$lib/util/config';
  import type { PostMeta } from '$lib/util/types';
  import FeaturedPost from '$lib/components/FeaturedPost.svelte';

  interface Props {
    postList: PostMeta[];
  }

  let { postList }: Props = $props();
</script>

<div
  id="featured-posts-wrapper" class="vertically-separated-top hidden-mobile"
>
  <div id="major-featured">
    <FeaturedPost --header-size="1em" postMeta={postList[0]}/>
  </div>
  <div id="minor-featured">
    {#each postList.slice(1, 4) as post}
      <FeaturedPost --header-size="0.6em" postMeta={post}/>
    {/each}
  </div>
</div>

<style lang="scss">
    #featured-posts-wrapper {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      gap: 1rem;
    
      #major-featured {
        min-height: 8rem;
      }
      
      #minor-featured {
        display: flex;
        gap: 1rem;
      }
    }
</style>
