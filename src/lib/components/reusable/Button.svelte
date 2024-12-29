<script lang="ts">
  interface Props {
    icon?: string | null;
    disabled?: boolean;
    link?: boolean;
    children?: import('svelte').Snippet;
    onclick?: () => void;
    onkeydown?: () => void;
  }

  let {
    icon = null,
    disabled = false,
    link = false,
    children,
    onclick,
    onkeydown
  }: Props = $props();
</script>

<button class={link ? 'link-button' : ''} {disabled} onclick={onclick} onkeydown={onkeydown}>
  {#if icon}
    <span class="icon material-icons">{icon}</span>
  {/if}
  {@render children?.()}
</button>
