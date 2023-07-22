<script lang="ts">
  export let icon: string | null = null;

  let button;
</script>

<button bind:this={button} on:click>
  {#if icon}
    <span class="icon material-icons">{icon}</span>
  {/if}
  <slot />
</button>
