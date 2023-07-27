<script lang="ts">
</script>

<div class="settings-wrapper editor-wrapper">
	<slot />
</div>

<style lang="scss">
	.settings-wrapper {
		width: 100%;
		max-width: var(--article-max-width);

		:global(> *) {
			border-top: var(--border);
		}

		:global(> *:last-child) {
			border-bottom: var(--border);
		}
	}
</style>
