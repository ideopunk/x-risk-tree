<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { onMount } from 'svelte';

	export let time: string;

	export let chart: string;
	$: realChart = JSON.parse(chart);

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

<article class="w-screen text-center prose">
	<h1 class="text-center mt-8 mb-4">The Tree of Forking Paths</h1>
	<h2 class="text-center mt-1">In how many of our futures does humanity survive?</h2>
</article>

{#if chart}
	{@html realChart}
{/if}

<article class="self-align text-justify prose py-12 mx-4 prose-p:text-xl">
	<p>
		Over the next century, humanity could flourish or it could experience a global catatastrophe. It
		could even go extinct.
	</p>
	<p>
		But we are not doomed. We have the ability to prune the branches we face. We can reduce our
		existential risks until every path leads to survival.
	</p>
	<p>
		This tree is built from Metaculus's <ExternalLink
			href="https://www.metaculus.com/questions/2568">Ragnarok series</ExternalLink
		>. It is updated every night (last: {new Date(time).toDateString()}). It tracks predictions
		concerning
		<span class="text-red-500 font-bold">global catastrophes</span>
		and
		<span class="text-black font-bold">(near-)extinction events</span>.
	</p>
	<p>
		If you'd like to learn more about existential risks, see our <a
			sveltekit:prefetch
			href="faq"
			class="text-green-forest hover:text-black transition-colors font-bold">FAQ</a
		>.
	</p>
</article>
