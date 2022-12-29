<script lang="ts">
	import { postComment } from '$lib/database';
	import { loginInfo } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
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
			<button on:click={sendComment}>Lähetä</button>
		{:else}
			<button on:click={() => (open = true)}>Vastaa</button>
		{/if}
	</div>
{/if}
