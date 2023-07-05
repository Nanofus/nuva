<script lang="ts">
  import { postComment } from "$lib/database";
  import { loginInfo } from "$lib/stores";
	import { toast } from '@zerodevx/svelte-toast';
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import Input from "$lib/components/reusable/Input.svelte";
  import Form from "$lib/components/reusable/Form.svelte";
  import { toastThemes } from "$lib/util";

  export let parent: number;
  export let postId: number;

  let loggedIn: boolean | null = null;
  loginInfo.subscribe((loginInfo) => {
    loggedIn = !!loginInfo;
  });

  let open: boolean = false;
  let content: string = "";

  const dispatch = createEventDispatcher();

  const sendComment = async () => {
    if (!content || content === "") {
			toast.push("Kommentti ei voi olla tyhjä", toastThemes.error);
			return;
		}
    await postComment(postId, parent, content);
    dispatch("commentSent");
    content = "";
    open = false;
  };
</script>

{#if loggedIn}
  <div class="comment-reply">
    {#if open}
      <Form>
        <Input type="multiline" placeholder="Vastaa..." bind:value={content} />
        <Button on:click={sendComment}>Lähetä</Button>
      </Form>
    {:else}
      <Button on:click={() => (open = true)}>Vastaa</Button>
    {/if}
  </div>
{/if}
