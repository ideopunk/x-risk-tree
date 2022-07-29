<script lang="ts">
	import Details from '$lib/components/details.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import InternalLink from '$lib/components/InternalLink.svelte';
	import Legend from '$lib/components/Legend.svelte';
	import type { Highlight } from '$lib/types';
	import { onMount } from 'svelte';

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

	export let chart: string;
	$: realChart = JSON.parse(chart);

	onMount(() => {
		const paths = document.querySelectorAll('path');
		paths.forEach((path) => {
			const length = path.getTotalLength();
			path['stroke-dasharray'] = length;
			path['stroke-dashoffset'] = length;
			path.setAttribute('stroke-dasharray', String(length));
			path.setAttribute('stroke-dashoffset', String(length));
			path.classList.add('anime');
		});

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		if (mediaQuery.matches) {
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
	<link rel="canonical" href="https://x-risk-tree.com/" />
</svelte:head>

<article class="w-screen text-center prose">
	<h1 class="text-center mt-4 mb-1">The X-Risk Tree</h1>
</article>

<div class={`${highlight} relative `}>
	<div class="flex lg:absolute px-6 lg:px-0 justify-between w-full">
		<Legend on:message={handleMessage} />
		<Details {vals} {highlight} />
	</div>
	{#if chart}
		{@html realChart}
	{/if}
</div>

<article class="w-screen text-center prose">
	<h2 class="text-center mt-1">In how many of our futures does humanity survive this century?</h2>
</article>

<article class="self-align text-justify prose py-12 mx-4 prose-p:text-xl">
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
</article>
