<script lang="ts">
	export let data: any;
</script>

<html lang="fi">
	<h1>Klaanon Nuva</h1>

	<h2>Kaikki ropeosat</h2>
	<ul>
		{#each data.posts as post}
			<li><a href="/posts/{post.slug}">{post.title}</a></li>
		{/each}
	</ul>
</html>
