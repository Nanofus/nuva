<script lang="ts">
	export let href = '';
	let openInNewTab = false;

	$: href.indexOf('http') === 0 && (openInNewTab = true);
</script>

{#if href}
	<a {href} target={openInNewTab ? '_blank' : null} on:click>
		<slot />
	</a>
{:else}
	<div on:click>
		<slot />
	</div>
{/if}

<style lang="scss">
	div,
	a {
		display: block;
		line-height: var(--navigation-height);
		height: var(--navigation-height);
		padding: 0 0.5em;
		cursor: pointer;

		&:hover {
			background-color: var(--hover-transparent);
		}
	}

	a {
		transition: var(--unfocus-speed) ease-in-out;

		&:active,
		&:hover {
			color: var(--text-light);
			transition: 0s;
		}

		&:link,
		&:visited {
			color: var(--text-dark);
			text-decoration: none;
		}
	}
</style>
