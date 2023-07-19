<script>
  import { SITE_NAME, SITE_NAME_DELIMITER, BASE_PATH, OG_LOCALE } from "$lib/config";

  export let title = null;
  export let isPost = false;
  export let image = null;
  export let url = null;
</script>

<svelte:head>
  <title>{title ? `${title} ${SITE_NAME_DELIMITER} ${SITE_NAME}` : SITE_NAME}</title>
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={title ? title : SITE_NAME} />
  <meta property="og:locale" content={OG_LOCALE} />
  <meta property="og:type" content={isPost ? "article " : "website"} />
  {#if image}
    <meta property="og:image" content={image} />
  {/if}
  {#if url}
    <meta property="og:url" content={BASE_PATH + url} />
  {/if}
</svelte:head>
