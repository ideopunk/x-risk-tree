<script lang="ts">
	import InternalLink from '$lib/components/InternalLink.svelte';
	import { onMount } from 'svelte';
	import treeify from '$lib/funcs/treeify';
	import toTitleCase from '$lib/funcs/titleCase';
	import Container from '$lib/components/Container.svelte';
	import svgToURL from '$lib/funcs/svgToURL';
	import SharableImg from '$lib/components/SharableImg.svelte';
	import { legendCatLeaf, legendExtinctionLeaf, legendGoodLeaf } from '$lib/funcs/leaf';

	let width: number;

	export let data: {
		title: string;
		link: string;
		notes: string[];
		name: string; // the future
		children: {
			name: string;
			children: {
				name: string;
			}[];
		}[];
	}[] = [];

	let predictions: { chart: SVGElement; title: string; notes: string[]; link: string }[] = [];

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		// do we want animations?
		let classes = mediaQuery.matches || (width && width < 767) ? 'instant' : '';

		for (const [ind, entry] of Object.entries(data)) {
			// use this later for sharing
			const newTree = treeify(entry, {
				label: (d) => d.name,
				title: (d, n) => toTitleCase(d.name),
				width: 612,
				height: 612,
				margin: 50,
				classes: classes + ' id' + ind
			});
			if (newTree) {
				predictions.push({
					chart: newTree,
					title: entry.title,
					link: entry.link,
					notes: entry.notes
				});

				predictions = predictions;
			}
		}
	});

	let url = '';
	// for some reason this only works when the img is truly rendered to the dom, so logic is split between components ¯\_(ツ)_/¯
	async function handleShare(selector: string) {
		url = svgToURL(selector);
	}
</script>

<svelte:head>
	<link rel="canonical" href="https://possibleworldstree.com/collection" />
	<title>The Possible Worlds Tree / Collection</title>
</svelte:head>
<svelte:window bind:innerWidth={width} />

<Container>
	<div class="w-[65ch] pl-0 lg:pl-24 pr-8 lg:fixed top-8 left-0 pointer-events-none" slot="left">
		<h3 class="text-xl mb-4">Alternative Existential Risk Estimates</h3>

		<ul class="pointer-events-none">
			<li class="mb-5 text-gray-700 relative">
				<span class="absolute -left-8 -top-2">
					<svg class="w-5 h-8 -rotate-180 scale-90 fill-blue-theme"><path d={legendGoodLeaf} /></svg
					>
				</span>

				<span class="text-blue-theme">Blue</span> branches indicate flourishing
			</li>
			<li class="mb-5 text-gray-700 relative">
				<span class="absolute -left-8 -top-2">
					<svg class="w-5 h-8 -rotate-180 scale-90 fill-green-theme"
						><path d={legendGoodLeaf} /></svg
					>
				</span>
				<span class="text-green-theme">Green</span> branches indicate either survival or sustenance
			</li>
			<li class="mb-5 text-gray-700 relative">
				<span class="absolute -left-8 -top-2">
					<svg class="w-4 left-[1px] h-8 relative  rotate-180 scale-90 fill-yellow-theme"
						><path d={legendCatLeaf} /></svg
					>
				</span>

				<span class="text-yellow-theme">Yellow</span> branches indicate catastrophe
			</li>
			<li class="mb-2 text-gray-700 relative">
				<span class="absolute -left-8 -top-2">
					<svg class="w-4 h-8 rotate-180 scale-90 fill-red-theme"
						><path d={legendExtinctionLeaf} /></svg
					></span
				>
				<span class="text-red-theme">Red</span> branches indicate extinction. While red branches in the
				Metaculus tree track near-extinction, in the collection they indicate total human extinction
				unless otherwise noted.
			</li>
		</ul>
		<p class="text-gray-700 pt-4">
			Different predictors evaluate different possibilities. Some do not include predictions
			concerning flourishing, some do not include predictions concerning catastrophes.
		</p>
		<div class="pointer-events-auto">
			<div class="text-xl mt-6">
				<InternalLink href="/">Home</InternalLink>
			</div>
			<div class="text-xl mt-2">
				<InternalLink href="/faq">FAQ</InternalLink>
			</div>
			<div class="text-xl mt-2">
				<InternalLink href="/predict">Predict</InternalLink>
			</div>
		</div>
	</div>
	<div slot="right">
		{#if predictions.length}
			{#each predictions as prediction, i}
				<a href={prediction.link} class={`flex flex-col items-center text-black ${i + '-' + i}`}>
					<h3 class={`text-center self-center text-2xl ${i ? 'mt-16' : 'mt-16 lg:mt-0'} mb-1`}>
						{prediction.title}
					</h3>
					{#each prediction.notes as note}
						<p class="text-xs text-center">{note}</p>
					{/each}
					{@html prediction.chart.outerHTML}
				</a>
				<div class="flex justify-center">
					<button
						on:click={() => handleShare('svg.treeSVG.id' + i)}
						class="bg-green-theme mt-4 px-4 py-2 text-2xl hover:bg-green-700 transition-all rounded-sm cursor-pointer w-1/2"
						>Share</button
					>
				</div>
			{/each}
		{/if}
	</div>
</Container>

{#if url}
	<SharableImg {url} />
{/if}
