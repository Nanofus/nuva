<script>
    let url =
        "https://klaanon.fi/wp/wp-content/themes/klaanon/header-images/banner"
        + Math.round(1 + 6*Math.random())
        + ".png";
</script>

<header>
    <h1>Klaanon Nuva</h1>
    <img id="banner" src="{url}" />
</header>

<style>
    header > * {
        position: absolute;
        top: 0;
        left: 0;
    }

    h1 {
        font-size: 0;
    }
</style>