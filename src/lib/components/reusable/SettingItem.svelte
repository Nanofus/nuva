<script lang="ts">
	export let label: string;
</script>

<div class="padding-wrapper">
	<div class="setting-item">
		<label>{label}</label>
		<slot />
	</div>
</div>

<style>
	.setting-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.padding-wrapper {
		padding: 1rem;
	}
</style>
