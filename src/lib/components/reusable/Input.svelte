<script context="module" lang="ts">
  let counter: number = 0;
</script>

<script lang="ts">
  export let name: string | null = null;
  export let label: string | null = null;
  export let type: "text" | "password" | "multiline" = "text";
  export let placeholder: string | null = null;
  export let value: string = "";
  export let rows = 5;

  const elementId = "input_" + counter++;
  const elementIdSecondary = elementId;
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    value = target.value;
  };
</script>

<div class="input">
  {#if type === "multiline"}
    {#if label}
      <label for={elementId}>
        {label}
      </label>
    {/if}
    <textarea
      class="editor"
      {rows}
      id={elementId}
      {name}
      {placeholder}
      {value}
      on:input={handleInput}
    />
  {:else}
    {#if label}
      <label for={elementIdSecondary}>
        {label}
      </label>
    {/if}
    <input
      class="editor"
      id={elementIdSecondary}
      {name}
      {placeholder}
      {value}
      {type}
      on:input={handleInput}
    />
  {/if}
</div>

<style lang="scss">
  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
</style>
