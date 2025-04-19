<script lang="ts">
  import type { YearResponse } from '$lib/util/types';
  import { getPageTitle, getPageUrl } from '$lib/util/util';
  import { t } from '$lib/util/translations';
  import YearList from '$lib/components/YearList.svelte';

  interface Props {
    data: YearResponse;
  }

  let { data = $bindable() }: Props = $props();
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.posts.title)}</title>
  <meta content={t.pages.posts.title} property="og:title" />
  <meta content={getPageUrl('/posts')} property="og:url" />
</svelte:head>

<h1>{t.pages.posts.title}</h1>
<YearList years={data.years} />
