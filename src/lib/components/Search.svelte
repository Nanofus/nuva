<script lang="ts">
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { toastThemes } from "$lib/util";

  let searchTerm = "";

  const search = () => {
    if (searchTerm === "" || !searchTerm) {
      toast.push("Laitapa hakukenttään edes jotain", toastThemes.error);
      return;
    }
    window.location.href = `/search/${encodeURI(searchTerm)}`;
  }
</script>

<div class="search-area">
  <Form>
    <Input bind:value={searchTerm} placeholder="Hakusanat" />
    <Button icon="search" on:click={search}>Etsi</Button>
  </Form>
</div>

<style lang="scss">
  .search-area {
    width: calc(var(--article-max-width) / 2);
  }
</style>