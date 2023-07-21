<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { CommentMeta, PostListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { META_CATEGORY_SLUG } from "$lib/config";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import FeaturedPost from "$lib/components/FeaturedPost.svelte";
  import CommentList from "$lib/components/CommentList.svelte";

  export let data: { posts: PostListResponse, comments: CommentMeta[] };
</script>

<svelte:head>
  <title>{getPageTitle("Etusivu")}</title>
  <meta content={"Etusivu"} property="og:title" />
  <meta content={getPageUrl(`/`)} property="og:url" />
</svelte:head>

<div class="vertically-separated-top">
  <FeaturedPost postMeta={data.posts.posts[0]} />
</div>
<h3>Uusimmat julkaisut</h3>
<PostList posts={data.posts.posts} />
<h3>Uusimmat kommentit</h3>
<CommentList comments={data.comments} />
