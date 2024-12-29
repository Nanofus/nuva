<script module lang="ts">
  let counter: number = 0;
</script>

<script lang="ts">
  interface Props {
    name?: string | null;
    label?: string | null;
    type?: 'text' | 'password' | 'multiline';
    placeholder?: string | null;
    value?: string;
    rows?: number;
  }

  let {
    name = null,
    label = null,
    type = 'text',
    placeholder = null,
    value = $bindable(''),
    rows = 5
  }: Props = $props();

  const elementId = 'input_' + counter++;
  const elementIdSecondary = elementId;
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    value = target.value;
  };
</script>

<div class="input">
  {#if type === 'multiline'}
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
      oninput={handleInput}
    ></textarea>
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
      oninput={handleInput}
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
