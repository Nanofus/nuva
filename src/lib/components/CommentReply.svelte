<script lang="ts">
	import { postComment } from '$lib/database';
	import { loginInfo } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import Button from "$lib/components/reusable/Button.svelte";
	let loggedIn: boolean | null = null;
	loginInfo.subscribe((loginInfo) => {
		loggedIn = loginInfo ? true : false;
	});

	export let parent: number;
	export let postId: number;

	let open: boolean = false;
	let content: string;

	const dispatch = createEventDispatcher();

	const sendComment = async () => {
		if (!content || content === "") return;
		await postComment(postId, parent, content);
		dispatch('commentSent');
		content = '';
		open = false;
	};
</script>

{#if loggedIn}
	<div class="comment-reply">
		{#if open}
			<input type="multiline" placeholder="Vastaa..." bind:value={content} />
			<Button on:click={sendComment}>Lähetä</Button>
		{:else}
			<Button on:click={() => (open = true)}>Vastaa</Button>
		{/if}
	</div>
{/if}
