<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { onMount } from 'svelte';

	export let charts: string;
	$: realCharts = JSON.parse(charts);

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

<div class="flex justify-center my-8">
	<a href="/" sveltekit:prefetch class="font-bold text-xl mx-8">Home</a>
	<a href="/" sveltekit:prefetch class="font-bold text-xl mx-8">FAQ</a>
</div>
<h3 class="text-2xl">Alternative X-Risk Estimates</h3>

{#if charts}
	{@html realCharts}
{/if}
