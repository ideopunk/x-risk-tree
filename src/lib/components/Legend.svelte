<script lang="ts">
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
		console.log('ONCLICK', h);
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
	class={`absolute -left-10 text-xl top-0 w-8 text-black transition-transform hover:-rotate-90 ${
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
	<form transition:slide class={`border-black border-2  p-3 pr-4 block z-20 text-sm`}>
		{#each options as option}
			<label
				class={`flex group items-center cursor-pointer`}
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
					}   relative -top-[1px]`}
				/>
				<span
					class={`ml-2 transition-transform ${
						clickedHighlight === option
							? 'scale-110'
							: hoverHighlight === option
							? 'scale-105'
							: 'scale-100'
					}`}>{toTitleCase(option)}</span
				>
			</label>
		{/each}
	</form>
{/if}
