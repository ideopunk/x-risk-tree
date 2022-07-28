<script lang="ts">
	import toTitleCase from '$lib/funcs/titleCase';

	import type { Highlight } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let hoverHighlight: Highlight = '';
	let clickedHighlight: Highlight = '';
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
</script>

<form class=" border-black border-2  p-3 pr-4 block z-20 text-sm">
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
