<script lang="ts">
  import { LOCALE } from "$lib/config";
  import CategoryList from "$lib/components/CategoryList.svelte";
  import type { Post } from "$lib/types";

  export let post: Post;
</script>

<header class="post-header">
  <div class="post-meta">
    <CategoryList categories={post.categories} />
  </div>
  <h1 class="post-title">{post.title}</h1>
  <div class="post-meta">
    <time class="post-date">{post.date.toLocaleDateString(LOCALE)}</time>
    <span class="post-authors">{post.authors.join(', ')}</span>
    <span class="post-comments-link">
			<a href="#comments">{post.commentCount ? post.commentCount : 0} kommenttia</a>
		</span>
  </div>
</header>