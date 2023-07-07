<script lang="ts">
  import { postComment } from "$lib/database";
  import { loginInfo } from "$lib/stores";
  import { toast } from "@zerodevx/svelte-toast";
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toastThemes } from "$lib/util";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  export let parent: number;
  export let postId: number;

  let loggedIn: boolean | null = null;
  loginInfo.subscribe((loginInfo) => {
    loggedIn = !!loginInfo;
  });

  let open: boolean = false;
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
    open = false;
  };
</script>

{#if loggedIn}
  <div class="comment-reply">
    {#if open}
      {#if sending}
        <div class="sending-spinner">
          <LoadingSpinner />
        </div>
      {:else}
        <Form>
          <Input type="multiline" placeholder="Vastaa..." bind:value={content} />
          <Button on:click={sendComment}>Lähetä</Button>
        </Form>
      {/if}
    {:else}
      <a role="button" tabindex="0" on:click={() => (open = true)}>Kommentoi</a>
    {/if}
  </div>
{/if}

<style lang="scss">
  .sending-spinner {
    text-align: center;
  }
</style>