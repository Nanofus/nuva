<script lang="ts">
    import { globalConfig } from "$lib/util/config";
    import type { PostMeta } from "$lib/util/types";
    import FeaturedPost from "$lib/components/FeaturedPost.svelte";
    import {browser} from "$app/environment";

    export let postList: PostMeta[];

    let currentSlide = 0;
    let hasUserInteracted = false;
    function prevSlide() {
        showSlide(currentSlide - 1);
        hasUserInteracted = true;
    }
    function nextSlide() {
        showSlide(currentSlide + 1);
        hasUserInteracted = true;
    }

    function showSlide(n) {
        if (!browser) return;
        let newSlide = n % globalConfig.featuredPostsCount
        document.querySelector<HTMLElement>(".featured-posts-wrapper")
            ?.style.setProperty("margin-left",
                newSlide * -100 + "%"
            );

        document.querySelectorAll<HTMLElement>(".dots .dot")[currentSlide]
            ?.classList.remove("active");
        document.querySelectorAll<HTMLElement>(".dots .dot")[newSlide]
            ?.classList.add("active");

        currentSlide = newSlide;
    }

    setInterval(function(){
        if (!hasUserInteracted) {
            nextSlide();
            hasUserInteracted = false;
        } else {
            hasUserInteracted = false;
        }
    }, 6000);

</script>

<div class="featured-posts-wrapper" style="width: {globalConfig.featuredPostsCount * 100}%">
    {#each postList.slice(0, globalConfig.featuredPostsCount) as post}
        <FeaturedPost postMeta={post} />
    {/each}
</div>
<button class="prev" on:click={prevSlide}>❮</button>
<button class="next" on:click={nextSlide}>❯</button>
<div class="dots">
    {#each Array(globalConfig.featuredPostsCount) as _, index (index)}
        <div class="{index <= 0 ? 'dot active' : 'dot'}" on:click={() => {
            showSlide(index);
            hasUserInteracted = true;
        }}></div>
    {/each}
</div>

<style lang="scss">
  .featured-posts-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    transition: margin 200ms ease-in-out;
  }

  .dots {
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .dot {
    height: 0.75rem;
    width: 0.75rem;
    margin: 0 0.25rem;
    background-color: rgba(255,255,255,0.33);
    border-radius: 50%;
    display: inline-block;
    transition: background-color 200ms ease-in-out;
    cursor: pointer;
  }

  .dot.active {
    background-color: rgba(255,255,255,0.5);
  }

  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 1rem;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    transition: 200ms ease-in-out;
    border-radius: 0 3px 3px 0;
    user-select: none;
    background-color: transparent;
  }

  .prev:hover, .next:hover {
    background-color: rgba(255,255,255,0.33);
  }

  .next {
    right: 0;
  }

</style>