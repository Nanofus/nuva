<script lang="ts">
	import type { CategoryListResponse } from '$lib/types';

	export let data: CategoryListResponse;
</script>

<main>
	<h2>Kategoriat</h2>
	<ul>
		{#each data.categories as category}
			<li>
				<a href="/categories/{category.slug}">{category.name}</a>
				{#if category.children.length > 0}
					<ul class="child-list">
						{#each category.children as child}
							<li>
								<a href="/categories/{child.slug}">{child.name}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;

		&.child-list {
			padding-left: 1em;
		}
	}
</style>
