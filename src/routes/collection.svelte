<script lang="ts">
	import InternalLink from '$lib/components/InternalLink.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import treeify from '$lib/funcs/treeify';
	import toTitleCase from '$lib/funcs/titleCase';
	import Container from '$lib/components/Container.svelte';

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
	if (browser) {
		for (let entry of data) {
			console.log(entry);
			const newTree = treeify(entry, {
				label: (d) => d.name,
				title: (d, n) => toTitleCase(d.name),
				width: 632,
				height: 632,
				margin: 50
			});
			console.log(newTree);
			if (newTree) {
				predictions.push({
					chart: newTree,
					title: entry.title,
					link: entry.link,
					notes: entry.notes
				});
			}
		}
	}

	let width: number;
	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		if (mediaQuery.matches || (width && width < 767)) {
			const paths: NodeListOf<SVGPathElement> = document.querySelectorAll('path.line'); // using the classname confuses typescript
			paths.forEach((p) => {
				p.classList.add('instant');
			});

			const texts = document.querySelectorAll('text');
			texts.forEach((t) => {
				t.classList.add('instant');
			});

			const svgs = document.querySelectorAll('svg');
			svgs.forEach((s) => {
				s.classList.add('instant');
			});
		}
	});
</script>

<svelte:head>
	<link rel="canonical" href="https://x-risk-tree.com/collection" />
	<title>The X-Risk Tree / Collection</title>
</svelte:head>
<svelte:window bind:innerWidth={width} />

<Container>
	<div class="w-[65ch] pl-0 lg:pl-24 pr-8 lg:fixed top-8 left-0 pointer-events-none" slot="left">
		<h3 class="text-xl mb-4">Alternative X-Risk Estimates</h3>

		<ul class="pointer-events-none">
			<li class="my-2 text-gray-700">
				<span class="text-blue-theme">Blue</span> branches indicate flourishing
			</li>
			<li class="my-2 text-gray-700">
				<span class="text-green-theme">Green</span> branches indicate either survival or sustenance
			</li>
			<li class="my-2 text-gray-700">
				<span class="text-yellow-theme">Yellow</span> branches indicate catastrophe
			</li>
			<li class="my-2 text-gray-700">
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
				<InternalLink href="/self">Create</InternalLink>
			</div>
		</div>
	</div>
	<div slot="right">
		{#if predictions.length}
			{#each predictions as prediction, i}
				<a href={prediction.link} class="block text-black">
					<h3 class={`text-center self-center text-2xl ${i ? 'mt-16' : 'mt-16 lg:mt-0'} mb-1`}>
						{prediction.title}
					</h3>
					{#each prediction.notes as note}
						<p class="text-xs text-center">{note}</p>
					{/each}
					{@html prediction.chart.outerHTML}
				</a>
			{/each}
		{/if}
	</div>
</Container>
