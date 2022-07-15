<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import InternalLink from '$lib/components/InternalLink.svelte';
	import { onMount } from 'svelte';

	export let charts: { tree: string; title: string; notes: string[] }[];

	/* 
	For some reason I can't crack using getTotalPath serverside. Perhaps it's a jsdom issue? 
	*/
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
	});
</script>

<!-- <h3 class="text-2xl mb-12 text-center">Alternative X-Risk Estimates</h3> -->

<div
	class="flex flex-col lg:flex-row px-8 lg:px-0 lg:h-screen w-screen justify-between pt-8 relative"
>
	<div class="flex justify-center lg:w-1/3 ">
		<div class="w-[65ch] pl-0 lg:pl-24 pr-8 fixed top-8 left-0 pointer-events-none">
			<h3 class="text-xl mb-4">Alternative X-Risk Estimates</h3>

			<ul class="pointer-events-none">
				<li class="my-2 text-gray-700">
					<span style="color: blue;">Blue</span> branches indicate flourishing
				</li>
				<li class="my-2 text-gray-700">
					<span style="color: green;">Green</span> branches indicate survival
				</li>
				<li class="my-2 text-gray-700">
					<span style="color: red;">Red</span> branches indicate catastrophe
				</li>
				<li class="my-2 text-gray-700">
					<span style="color: black;">Black</span> branches indicate extinction
				</li>
			</ul>
			<p class="text-gray-700">
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
			</div>
		</div>
	</div>
	<div class="lg:w-2/3 pb-12 flex flex-col items-center">
		{#if charts}
			{#each charts as chart, i}
				<h3 class={`text-center self-center text-2xl ${i && 'mt-16'} mb-1`}>{chart.title}</h3>
				{#each chart.notes as note}
					<p class="text-xs">{note}</p>
				{/each}
				{@html chart.tree}
			{/each}
		{/if}
	</div>
</div>
