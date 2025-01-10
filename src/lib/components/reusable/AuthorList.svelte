<script lang="ts">
  const { authors } = $props();
</script>

<span class="author-list">
  {#each authors as author, i}
    <span><a href="/authors/{encodeURI(author)}">{author}</a>{#if i !== authors.length - 1},{' '}{/if}</span>
  {/each}
</span>

<style>
  .author-list a {
    color: var(--author-link-color, var(--link));
  }
</style>