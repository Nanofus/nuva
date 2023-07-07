<script lang="ts">
  import type { Post } from "$lib/types";
  import PostTags from "$lib/components/PostTags.svelte";
  import PostComments from "$lib/components/PostComments.svelte";

  export let post: Post;
</script>

<footer id="post-footer">
  <PostTags tags={post.tags} />
  <PostComments {post} />
</footer>
