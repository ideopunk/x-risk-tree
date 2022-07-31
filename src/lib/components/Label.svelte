<script lang="ts">
	export let htmlFor = '';
	export let legend = false;
	export let size: 'sm' | 'md' | 'lg' = 'lg';
	$: htmlClass = 'block ' + (size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-xl');
</script>

{#if legend}
	<legend for={htmlFor} class={htmlClass}><slot /></legend>
{:else}
	<label for={htmlFor} class={htmlClass}><slot /></label>
{/if}
