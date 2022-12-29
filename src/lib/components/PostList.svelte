<script lang="ts">
	export let posts: Post[];
</script>

<ul class="post-list">
	{#each posts as post}
		<li><a href="/posts/{post.slug}">{post.title}</a></li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
	}
</style>
