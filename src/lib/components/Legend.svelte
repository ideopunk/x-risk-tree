<script lang="ts">
	import { goodLeaf, legendCatLeaf, legendExtinctionLeaf, legendGoodLeaf } from '$lib/funcs/leaf';
	import toTitleCase from '$lib/funcs/titleCase';

	import type { Highlight } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	let hoverHighlight: Highlight = '';
	let clickedHighlight: Highlight = '';
	let showLegend = true;
	let options = ['survival', 'extinction'] as const;
	$: {
		dispatch('message', { highlight: hoverHighlight ? hoverHighlight : clickedHighlight });
	}

	function onClick(h: Highlight) {
		if (clickedHighlight !== h) {
			clickedHighlight = h;
		} else {
			clickedHighlight = '';
		}
	}

	function onHoverBegin(h: Highlight) {
		hoverHighlight = h;
	}

	function onHoverEnd() {
		hoverHighlight = '';
	}

	function toggle() {
		clickedHighlight = '';
		showLegend = !showLegend;
	}
</script>

<button
	class={`absolute -left-0 lg:left-4 text-xl top-1 hidden sm:block lg:top-6 w-8 z-10 text-black transition-transform hover:-rotate-90 ${
		!showLegend && '-rotate-180 '
	} duration-500`}
	on:click={toggle}
	><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
		><title>Legend Toggle</title><path
			fill="none"
			stroke="currentColor"
			stroke-linecap="butt"
			stroke-linejoin="round"
			stroke-width="48"
			d="M112 184l144 144 144-144"
		/></svg
	></button
>
{#if showLegend}
	<form
		transition:slide|local
		class={`border-black  lg:absolute top-4 left-16  p-3 pr-4 block z-20 text-sm`}
	>
		{#each options as option, i}
			<label
				class={`flex group items-center ${i ? 'pb-0' : 'pb-4'} cursor-pointer`}
				on:mouseover={() => onHoverBegin(option)}
				on:focus={() => onHoverBegin(option)}
				on:mouseout={onHoverEnd}
				on:blur={onHoverEnd}
				value={option}
			>
				<input
					checked={clickedHighlight === option}
					on:click={() => onClick(option)}
					type="radio"
					name="amount"
					value={option}
					class={`${
						option === 'survival' ? 'accent-green-theme' : 'accent-red-theme'
					}   relative -top-[1px] cursor-pointer`}
				/>
				<span
					class={`ml-2 w-20 transition-transform ${
						clickedHighlight === option
							? 'scale-110'
							: hoverHighlight === option
							? 'scale-105'
							: 'scale-100'
					}`}>{toTitleCase(option)}</span
				>
				<div
					class={`w-10 h-4 relative flex  -top-3 transition-transform ${
						clickedHighlight === option
							? 'scale-110'
							: hoverHighlight === option
							? 'scale-105'
							: 'scale-100'
					}`}
				>
					{#if i}
						<svg class="w-4 h-8 rotate-180 scale-90 fill-red-theme"
							><path d={legendExtinctionLeaf} /></svg
						>
					{:else}
						<svg class="w-5 h-8 -rotate-180 scale-90 fill-green-theme"
							><path d={legendGoodLeaf} /></svg
						>
						<svg class="w-5 h-8 relative top-[1px] rotate-180 scale-90 fill-yellow-theme"
							><path d={legendCatLeaf} /></svg
						>
					{/if}
				</div>
			</label>
		{/each}
	</form>
{/if}
