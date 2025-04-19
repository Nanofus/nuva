<script lang="ts">
  import type { YearResponse } from '$lib/util/types';

  interface Props {
    years: YearResponse['years'];
  }

  let { years }: Props = $props();
</script>

<div class="year-list">
  {#each years as year (year.year)}
    <a href={`/posts/year/${year.year}`}>
      <div class="year-card" style={year.featuredImage ? `background-image: url("${year.featuredImage}");` : ''}>
        <h1>
          {year.year}
        </h1>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  .year-list {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    width: calc(100% - 2rem);
  }

  a {
    color: var(--text-dark);

    &:hover {
      text-decoration: none;
    }
  }

  .year-card {
    background-position: center;
    background-size: cover;
    color: var(--text-dark);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
    text-shadow: var(--banner-shadow);
    display: flex;
    flex-direction: column;
    flex: 1;
    box-sizing: border-box;
    padding: 1.5rem 4rem 2.5rem;
    min-height: 12rem;
    border-radius: calc(var(--border-radius) * 2);

    h1 {
      margin-bottom: 0;
      text-align: left;
      text-shadow: var(--banner-shadow);
      line-height: var(--line-height, initial);
    }
  }
</style>