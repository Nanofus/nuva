<script lang="ts">
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { toastSettings } from "$lib/util/util";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { t } from "$lib/translations";

  let searchTerm = "";
  let submitted = false;

  const search = () => {
    if (searchTerm === "" || !searchTerm) {
      toast.push(t.components.search.emptyField, toastSettings.error);
      return;
    }
    window.location.href = `/search/${encodeURI(searchTerm)}`;
  };
</script>

<div class="search-area">
  <Form on:submit={() => (submitted = true)}>
    <Input bind:value={searchTerm} placeholder={t.components.search.searchTerms} />
    {#if !submitted}
      <Button icon="search" on:click={search} on:keyup={search}>{t.components.search.search}</Button
      >
    {:else}
      <LoadingSpinner />
    {/if}
  </Form>
</div>

<style lang="scss">
  .search-area {
    width: calc(var(--article-max-width) / 2);
  }
</style>
