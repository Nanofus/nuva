<script lang="ts">
  import { getTagList } from "$lib/database";
  import type { TagListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import List from "$lib/components/reusable/List.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import Pill from "$lib/components/reusable/Pill.svelte";
  import Search from "$lib/components/Search.svelte";
</script>

<PageHead title="Tagit" />

<h1>Haku</h1>
<Search />

<style lang="scss">
</style>

