<script lang="ts">
	export let icon: string | null = null;
	export let disabled: boolean = false;
	export let link: boolean = false;
</script>

<button class={link ? 'link-button' : ''} {disabled} on:click>
	{#if icon}
		<span class="icon material-icons">{icon}</span>
	{/if}
	<slot />
</button>
