<script lang="ts">
  import { postComment } from '$lib/client/api';
  import { toast } from '@zerodevx/svelte-toast';
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/reusable/Button.svelte';
  import Input from '$lib/components/reusable/Input.svelte';
  import Form from '$lib/components/reusable/Form.svelte';
  import { toastSettings } from '$lib/client/util';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import { t } from '$lib/client/localization';
  import { auth } from '$lib/client/stores';

  interface Props {
    parent: number;
    postId: number;
    postSlug: string;
    isReply: boolean;
  }

  let { parent, postId, postSlug, isReply }: Props = $props();

  let sending: boolean = $state(false);
  let content: string = $state('');

  const dispatch = createEventDispatcher();

  const sendComment = async () => {
    if (!content || content === '') {
      toast.push(t.components.commentForm.emptyComment, toastSettings.error);
      return;
    }
    sending = true;
    const result = await postComment(postId, postSlug, parent, content);
    if (!result) {
      toast.push(t.toasts.commentFailed, toastSettings.error);
    } else {
      toast.push(t.toasts.commentSent, toastSettings.success);
      content = '';
    }
    dispatch('commentSent');
    sending = false;
  };
</script>

{#if $auth}
  <div class="comment-reply">
    {#if sending}
      <LoadingSpinner />
    {:else}
      <Form>
        <Input
          type="multiline"
          placeholder={isReply ? `${t.common.reply}...` : `${t.common.comment}...`}
          bind:value={content}
        />
        <div class="button-group">
          <Button onclick={sendComment}>{t.common.send}</Button>
        </div>
      </Form>
    {/if}
  </div>
{/if}

<style>
  .button-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
