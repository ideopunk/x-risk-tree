<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import treeify from '$lib/treeify';
	import { validate_slots } from 'svelte/internal';
	import dataTransform from '$lib/dataTransform';

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

	console.log({ vals });

	let input = dataTransform(vals);
	let chart: SVGSVGElement | null = null;
	onMount(() => {
		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) =>
				`${n
					.ancestors()
					.reverse()
					.map((d) => d.data.name)
					.join('.')}`, // hover text
			// link: (d, n) =>
			// 	`https://github.com/prefuse/Flare/${n.children ? 'tree' : 'blob'}/master/flare/src/${n
			// 		.ancestors()
			// 		.reverse()
			// 		.map((d) => d.data.name)
			// 		.join('/')}${n.children ? '' : '.as'}`,
			width: 1152,
			height: 1152,
			margin: 250
		});
	});
</script>

<div class="border-2 w-full flex items-center justify-center">
	{@html chart?.outerHTML}
</div>
