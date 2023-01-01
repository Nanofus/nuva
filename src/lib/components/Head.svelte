<script>
    import {SITE_NAME} from "$lib/config.js";
    import {SITE_NAME_DELIMITER} from "$lib/config.js";

    export let pageTitle = null;

    let title = {SITE_NAME};
    if (pageTitle !== null) pageTitle += " " + {SITE_NAME_DELIMITER} + " " + pageTitle;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>