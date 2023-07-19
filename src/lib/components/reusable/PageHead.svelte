<script>
  import { BASE_PATH, OG_LOCALE, SITE_NAME, SITE_NAME_DELIMITER } from "$lib/config";

  export let title = null;
  export let isPost = false;
  export let image = null;
  export let url = null;
</script>

<svelte:head>
  <title>{title ? `${title} ${SITE_NAME_DELIMITER} ${SITE_NAME}` : SITE_NAME}</title>
  <meta content={SITE_NAME} property="og:site_name" />
  <meta content={title ? title : SITE_NAME} property="og:title" />
  <meta content={OG_LOCALE} property="og:locale" />
  <meta content={isPost ? "article " : "website"} property="og:type" />
  {#if image}
    <meta property="og:image" content={image} />
  {/if}
  {#if url}
    <meta property="og:url" content={BASE_PATH + url} />
  {/if}
</svelte:head>
