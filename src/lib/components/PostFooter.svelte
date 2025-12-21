<script lang="ts">
  import type { Post } from '$lib/types';
  import PostTags from '$lib/components/PostTags.svelte';
  import PostComments from '$lib/components/PostComments.svelte';
  import PostAuthors from '$lib/components/PostAuthors.svelte';
  import PostNextAndPrevious from '$lib/components/PostNextAndPrevious.svelte';

  interface Props {
    post: Post;
  }

  let { post }: Props = $props();
</script>

<footer class="vertically-separated" id="post-footer">
  {#if !post.metaPage}
    <PostAuthors {post} />
    <PostTags tags={post.tags} />
    <PostNextAndPrevious {post} />
    <PostComments {post} />
  {/if}
</footer>

<style>
  footer {
    margin-top: calc(2 * var(--vertical-separation-margin));
  }
</style>
