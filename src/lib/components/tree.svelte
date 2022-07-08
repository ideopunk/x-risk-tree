<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import treeify from '$lib/treeify';
	import { validate_slots } from 'svelte/internal';
	import dataTransform from '$lib/dataTransform';
	import linker from '$lib/linker';

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
	onMount(() => {
		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) => d.name,
			// title: (d, n) =>
			// 	`${n
			// 		.ancestors()
			// 		.reverse()
			// 		.map((d) => d.data.name)
			// 		.join('.')}`, // hover text
			link: (d, n) => linker(n),
			width: 652,
			height: 652,
			margin: 50
		});
	});
</script>

<div class="w-full flex items-center justify-center">
	{@html chart?.outerHTML}
</div>
