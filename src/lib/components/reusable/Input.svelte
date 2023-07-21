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

  let elementId = "input_" + counter++;
  const handleInput = e => value = e.target.value;
</script>

<div class="input">
  {#if label}
    <label for={elementId}>
      {label}
    </label>
  {/if}
  {#if type === "multiline"}
    <textarea class="editor" {rows} id={elementId} {name} {placeholder} {value} on:input={handleInput}></textarea>
  {:else}
    <input class="editor" id={elementId} {name} {placeholder} {value} {type} on:input={handleInput} />
  {/if}
</div>

<style lang="scss">
  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
</style>