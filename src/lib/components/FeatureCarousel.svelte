<script lang="ts">
  import { globalConfig, localConfig } from "$lib/util/config";
  import type { PostMeta } from "$lib/util/types";
  import FeaturedPost from "$lib/components/FeaturedPost.svelte";
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";

  export let postList: PostMeta[];

  let currentSlide = 0;
  let hasUserInteracted = false;
  let wrapper: HTMLDivElement;
  let dots: HTMLButtonElement[] = Array(globalConfig.featuredPostsCount);

  const prevSlide = () => {
    showSlide(currentSlide - 1);
    hasUserInteracted = true;
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
    hasUserInteracted = true;
  };

  const showSlide = (n: number) => {
    if (!browser) return;
    let newSlide =
      n < 0
        ? globalConfig.featuredPostsCount + (n % globalConfig.featuredPostsCount)
        : n % globalConfig.featuredPostsCount;
    wrapper?.style.setProperty("margin-left", newSlide * -100 + "%");
    dots[currentSlide]?.classList.remove("active");
    dots[newSlide]?.classList.add("active");
    currentSlide = newSlide;
  };

  let interval: NodeJS.Timer;

  onMount(() => {
    interval = setInterval(() => {
      if (!hasUserInteracted) {
        nextSlide();
      }
      hasUserInteracted = false;
    }, localConfig.featuredPostRotationInterval);
  });

  onDestroy(() => clearInterval(interval));
</script>

<div class="featured-posts-wrapper" bind:this={wrapper} style="width: {globalConfig.featuredPostsCount * 100}%">
  {#each postList.slice(0, globalConfig.featuredPostsCount) as post}
    <FeaturedPost postMeta={post} />
  {/each}
</div>
<button class="prev material-icons" on:click={prevSlide}>chevron_left</button>
<button class="next material-icons" on:click={nextSlide}>chevron_right</button>
<div class="dots">
  {#each dots as _, index (index)}
    <button
      class="dot {index <= 0 ? 'active' : ''}"
      bind:this={dots[index]}
      on:click={() => {
        showSlide(index);
        hasUserInteracted = true;
      }}
    ></button>
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
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 3rem;
    display: flex;
    justify-content: center;

    .dot {
      height: 0.65rem;
      width: 0.65rem;
      padding: 0;
      margin: 0 0.35rem;
      background-color: var(--semi-transparent-light);
      border-radius: 50%;
      display: inline-block;
      transition: background-color var(--transition-speed) ease-in-out;
      cursor: pointer;
      box-shadow: var(--subtle-shadow);

      &.active {
        background-color: var(--text-dark);
      }
    }
  }

  .prev,
  .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 1.5rem 0.5rem;
    margin-top: -2rem;
    transition: var(--transition-speed) ease-in-out;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    user-select: none;
    background-color: transparent;
    color: var(--semi-transparent-light);
    font-size: 2rem;
    height: 4rem;
    line-height: 1rem;
    text-shadow: var(--header-shadow);
    text-align: center;

    &:hover {
      color: var(--text-dark);
    }
  }

  .next {
    right: 0;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
</style>
