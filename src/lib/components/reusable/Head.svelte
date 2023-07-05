<script>
    import {SITE_NAME} from "$lib/config";
    import {SITE_NAME_DELIMITER} from "$lib/config";

    export let title = null;
</script>

<svelte:head>
    <title>{title ? `${title} ${SITE_NAME_DELIMITER} ${SITE_NAME}` : SITE_NAME}</title>
</svelte:head>
