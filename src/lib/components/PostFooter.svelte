<script lang="ts">
  import type { Post } from "$lib/types";
  import PostTags from "$lib/components/PostTags.svelte";
  import PostComments from "$lib/components/PostComments.svelte";
  import PostAuthors from "$lib/components/PostAuthors.svelte";

  export let post: Post;
</script>

<footer id="post-footer">
  <PostAuthors {post} />
  <PostTags tags={post.tags} />
  <PostComments {post} />
</footer>

<style lang="scss">
  footer {
    margin-top: calc(2 * var(--vertical-separation-margin));
  }
</style>
