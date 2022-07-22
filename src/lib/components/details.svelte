<script lang="ts">
	import type { Highlight } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let vals: {
		total: number;
		climate: number;
		climateX: number;
		nano: number;
		nanoX: number;
		nuke: number;
		nukeX: number;
		ai: number;
		aiX: number;
		bio: number;
		bioX: number;
	};
	export let highlight: Highlight;

	$: extinction = vals.climateX + vals.nanoX + vals.nukeX + vals.aiX + vals.bioX;
	$: num =
		highlight === 'survival' ? 100 - extinction : highlight === 'extinction' ? extinction : 0;
</script>

{#if num}
	<div transition:fade class="fixed right-4 top-4">{num} / 100</div>
{/if}
