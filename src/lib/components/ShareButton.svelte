<script lang="ts">
	export let handleShare: () => void;

	const noCopy = typeof ClipboardItem !== 'function';
</script>

{#if !noCopy}
	<div class="w-full flex justify-center ">
		<button
			on:click={handleShare}
			class="bg-green-theme mt-4 px-4 py-2 text-2xl hover:bg-green-700 transition-all rounded-sm cursor-pointer w-1/2"
			>Share</button
		>
	</div>
    {:else}
    <div class="mt-4 h-4"/>
{/if}
