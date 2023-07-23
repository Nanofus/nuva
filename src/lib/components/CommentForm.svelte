<script lang="ts">
  import { isLoggedIn, postComment } from "$lib/database";
  import { toast } from "@zerodevx/svelte-toast";
  import { createEventDispatcher, onMount } from "svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toastThemes } from "$lib/util";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  export let parent: number;
  export let postId: number;
  export let isReply: boolean;

  let loggedIn: boolean;
  onMount(() => {
    loggedIn = isLoggedIn();
  });

  let sending: boolean = false;
  let content: string = "";

  const dispatch = createEventDispatcher();

  const sendComment = async () => {
    if (!content || content === "") {
      toast.push("Kommentti ei voi olla tyhjä", toastThemes.error);
      return;
    }
    sending = true;
    await postComment(fetch, postId, parent, content);
    dispatch("commentSent");
    sending = false;
    content = "";
  };
</script>

{#if loggedIn}
  <div class="comment-reply">
    {#if sending}
      <LoadingSpinner />
    {:else}
      <Form>
        <Input type="multiline" placeholder={isReply ? "Vastaa..." : "Kommentoi..."} bind:value={content} />
        <div class="button-group">
          <Button link on:click={() => dispatch("close")}>Sulje</Button>
          <Button on:click={sendComment}>Lähetä</Button>
        </div>
      </Form>
    {/if}
  </div>
{/if}

<style lang="scss">
  .button-group {
    a {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>