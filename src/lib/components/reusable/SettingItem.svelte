<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="padding-wrapper">
  <div class="setting-item">
    {@render children?.()}
  </div>
</div>

<style>
  .setting-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .padding-wrapper {
    padding: 1rem;
  }
</style>
