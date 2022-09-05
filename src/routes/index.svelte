<script lang="ts">
	import Details from '$lib/components/details.svelte';
	import { browser } from '$app/env';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import InternalLink from '$lib/components/InternalLink.svelte';
	import Legend from '$lib/components/Legend.svelte';
	import type { Highlight } from '$lib/types';
	import { onMount } from 'svelte';
	import treeify from '$lib/funcs/treeify';
	import metaculusDataTransform from '$lib/funcs/metaculusDataTransform';
	import linker from '$lib/funcs/metaculusLinker';
	import toTitleCase from '$lib/funcs/titleCase';
	import svgToURL from '$lib/funcs/svgToURL';
	import SharableImg from '$lib/components/SharableImg.svelte';

	let highlight: Highlight = '';
	function handleMessage(e: CustomEvent) {
		highlight = e.detail.highlight;
	}

	export let time: string;
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

	let input = metaculusDataTransform(vals);
	
	let chart: SVGSVGElement | null = null;
	if (browser) {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) => toTitleCase(d.name),
			link: (d, n) => linker(n),
			width: 632,
			height: 632,
			margin: 50,
			classes: mediaQuery.matches ? 'instant' : ''
		});
	}

	let url = '';
	// for some reason this only works when the img is truly rendered to the dom, so logic is split between components ¯\_(ツ)_/¯
	async function handleShare() {
		url = svgToURL('svg.treeSVG');
	}
</script>

<svelte:head>
	<link rel="canonical" href="https://possibleworldstree.com/" />
	<title>The Possible Worlds Tree</title>
</svelte:head>

<article class="w-screen text-center prose">
	<h1 class="text-center mt-4 mb-1">The Possible Worlds Tree</h1>
</article>

<div class={`${highlight} relative lg:static `}>
	<div class="flex  px-6 lg:px-0 justify-between w-full">
		<Legend on:message={handleMessage} />
		<div>
			<Details {vals} {highlight} />
		</div>
	</div>
	<!-- prevent CLS -->
	{#if chart}
		{@html chart.outerHTML}
	{:else}<div class="w-[632px] h-[632px]" />{/if}

	<div class="w-full flex justify-center ">
		<button
			on:click={handleShare}
			class="bg-green-theme mt-4 px-4 py-2 text-2xl hover:bg-green-700 transition-all rounded-sm cursor-pointer w-1/2"
			>Share</button
		>
	</div>
	{#if url}
		<SharableImg {url} />
	{/if}
</div>

<article class="w-screen text-center prose">
	<h2 class="text-center mt-12 px-4 text-4xl">
		In how many of our futures does humanity survive this century?
	</h2>
</article>

<article class="self-align prose max-w-[60ch] py-12 mx-4 prose-p:text-xl">
	<p>
		Over the next century, humanity could flourish or it could experience a global catatastrophe. It
		could even go extinct.
	</p>
	<p>
		But we are not doomed. Like gardeners, we can prune the branches of our future. We can reduce
		our existential risks until every path leads to survival or even flourishing.
	</p>
	<p>
		This tree is built from the prediction platform Metaculus's <ExternalLink
			href="https://www.metaculus.com/questions/2568">Ragnarok series</ExternalLink
		>. It is updated every night (last: {new Date(time).toDateString()}). It tracks predictions
		concerning
		<span class="text-yellow-theme font-bold">global catastrophes</span>
		and
		<span class="text-red-theme font-bold">(near-)extinction events</span>.
	</p>
	<p>
		If you'd like to learn more about existential risk, see our <InternalLink href="faq"
			>FAQ</InternalLink
		>.
	</p>
	<p>
		Other predictions can be found in our <InternalLink href="/collection">collection</InternalLink
		>.
	</p>
	<p>
		To make your own prediction, try our <InternalLink href="/predict">Predict</InternalLink> page.
	</p>
</article>
