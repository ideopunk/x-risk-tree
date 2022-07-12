<script lang="ts">
	import { draw } from 'svelte/transition';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import treeify from '$lib/funcs/treeify';
	import { validate_slots } from 'svelte/internal';
	import dataTransform from '$lib/funcs/dataTransform';
	import linker from '$lib/funcs/linker';
	import { animateInnerPaths, animateLeaves, animateOuterPaths } from '$lib/funcs/animations';

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

	let input = dataTransform(vals);
	let chart: SVGSVGElement | null = null;
	if (browser) {
		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) => d.name,
			link: (d, n) => linker(n),
			width: 652,
			height: 652,
			margin: 50
		});
	}

	onMount(() => {
		// Animate the graph
		animateInnerPaths();
		animateOuterPaths();
		animateLeaves();
	});
</script>

<div class="w-full h-[652px] flex items-center justify-center">
	{#if chart}
		{@html chart?.outerHTML}
	{/if}
</div>
