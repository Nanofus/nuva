<script lang="ts">
  export let icon: string | null = null;
  export let disabled : boolean = false;

  let button;
</script>

<button bind:this={button} {disabled} on:click>
  {#if icon}
    <span class="icon material-icons">{icon}</span>
  {/if}
  <slot />
</button>
