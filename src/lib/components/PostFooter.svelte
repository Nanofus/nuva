<script lang="ts">
  import TagList from "$lib/components/TagList.svelte";
  import CommentArea from "$lib/components/CommentArea.svelte";
  import type { Post } from "$lib/types";

  export let post: Post;
</script>

<footer class="post-footer">
  <TagList tags={post.tags} />
  <CommentArea {post} />
</footer>
