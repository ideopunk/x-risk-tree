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
	<div class="lg:absolute top-8 right-8" transition:fade>{num} out of 100 Futures</div>
{/if}
