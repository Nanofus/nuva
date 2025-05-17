<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import type { PostListByDateResponse } from '$lib/types';
  import { getPageTitle, getPageUrl } from '$lib/client/util';

  interface Props {
    data: PostListByDateResponse;
  }

  let { data = $bindable() }: Props = $props();

  function getDateString() {
    const dateParts = data.date.split('-');
    const year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2];
    if (day[0] === '0') day = day.substring(1);
    if (month[0] === '0') month = month.substring(1);
    return `${day}.${month}.${year}`;
  }
</script>

<svelte:head>
  <title>{getPageTitle(`${getDateString()}`)}</title>
  <meta content={`${getDateString()}`} property="og:title" />
  <meta content={getPageUrl('/posts/year/' + data.date)} property="og:url" />
</svelte:head>

<h1>{getDateString()}</h1>
<PostList posts={data.posts} reverse={true} />
