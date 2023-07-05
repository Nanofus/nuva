<script context="module" lang="ts">
  let counter: number = 0;
</script>

<script lang="ts">
  export let name: string | null = null;
  export let label: string | null = null;
  export let type: "text" | "password" | "multiline" = "text";
  export let placeholder: string | null = null;
  export let value: string = "";

  let elementId = "input_" + counter++;
  const handleInput = e => value = e.target.value;
</script>

{#if label}
  <label for={elementId}>
    {label}
  </label>
{/if}
{#if type === "multiline"}
  <textarea id={elementId} {name} {placeholder} {value} on:input={handleInput}></textarea>
{:else}
  <input id={elementId} {name} {placeholder} {value} {type} on:input={handleInput} />
{/if}

<style lang="scss">
  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 1rem;
    line-height: 1.5rem;
  }
</style>