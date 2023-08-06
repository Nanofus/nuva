<script lang="ts">
    import { globalConfig } from "$lib/util/config";
    import type { PostMeta } from "$lib/util/types";
    import FeaturedPost from "$lib/components/FeaturedPost.svelte";
    import {browser} from "$app/environment";
    import {onDestroy, onMount} from "svelte";

    export let postList: PostMeta[];

    let currentSlide = 0;
    let hasUserInteracted = false;
    const prevSlide = () => {
        showSlide(currentSlide - 1);
        hasUserInteracted = true;
    }
    const nextSlide = () => {
        showSlide(currentSlide + 1);
        hasUserInteracted = true;
    }

    const showSlide = (n) => {
        if (!browser) return;
        let newSlide = n < 0
            ? globalConfig.featuredPostsCount + (n % globalConfig.featuredPostsCount)
            : n % globalConfig.featuredPostsCount;
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

    let interval;
    onMount(() => {
        interval = setInterval(function(){
            if (!hasUserInteracted) {
                nextSlide();
            }
            hasUserInteracted = false;
        }, 6000);
    });
    onDestroy(() => clearInterval(interval));

</script>

<div class="featured-posts-wrapper" style="width: {globalConfig.featuredPostsCount * 100}%">
    {#each postList.slice(0, globalConfig.featuredPostsCount) as post}
        <FeaturedPost postMeta={post} />
    {/each}
</div>
<button class="prev material-icons" on:click={prevSlide}>chevron_left</button>
<button class="next material-icons" on:click={nextSlide}>chevron_right</button>
<div class="dots">
    {#each Array(globalConfig.featuredPostsCount) as _, index (index)}
        <button class="{index <= 0 ? 'dot active' : 'dot'}" on:click={() => {
            showSlide(index);
            hasUserInteracted = true;
        }}></button>
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
    padding: 0;
    margin: 0 0.25rem;
    background-color: rgba(255,255,255,0.33);
    border-radius: 50%;
    display: inline-block;
    transition: background-color 200ms ease-in-out;
    cursor: pointer;
    box-shadow: var(--header-shadow);
  }

  .dot.active {
    background-color: rgba(255,255,255,0.75);
  }

  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 1.5rem 0.5rem;
    margin-top: -2rem;
    transition: 200ms ease-in-out;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    user-select: none;
    background-color: transparent;
    color: rgba(255,255,255,0.75);
    font-size: 2rem;
    height: 4rem;
    line-height: 1rem;
    text-shadow: var(--header-shadow);
    text-align: center;
  }

  .next {
    right: 0;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  .prev:hover, .next:hover {
    background-color: rgba(255,255,255,0.33);
    color: rgba(255,255,255,1);
    box-shadow: var(--header-shadow);
  }

</style>