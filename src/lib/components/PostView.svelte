<script lang="ts">
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';

	export let post: Post;

    onMount(() => {
        // Eval magic to run scripts in the post
        // (1, eval) is a trick to make eval run in the global scope
        (1, eval)(post.scripts);

        // Parse JS from post content and eval it
        var doc = document.implementation.createHTMLDocument(); // Sandbox
        doc.body.innerHTML = post.content;
        [].map.call(doc.getElementsByTagName('script'), (scriptTag: HTMLScriptElement) => {
            (1, eval)(scriptTag.innerText);
        });
    });
</script>

<h1 class="post-title">{post.title}</h1>

{#if post.styles}
	<div class="post-style-container">{@html `<style>${post.styles}</style>`}</div>
{/if}

<div class="post-content">{@html post.content}</div>

<div class="comments" />
