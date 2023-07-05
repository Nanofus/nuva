<script lang="ts">
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import Form from "$lib/components/reusable/Form.svelte";

  let searchTerm = "";

  const search = () => window.location.href = `/search/${encodeURI(searchTerm)}`;
</script>

<div class="search-area">
  <Form>
    <Input bind:value={searchTerm} placeholder="Hakusanat" />
    <Button on:click={search}>Etsi</Button>
  </Form>
</div>

<style lang="scss">
  .search-area {
    margin: 0 1rem;
    vertical-align: middle;
    line-height: 3rem;
  }
</style>