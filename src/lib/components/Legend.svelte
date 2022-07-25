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

<form
	class="lg:absolute border-black lg:border-2 gap-8 lg:gap-0 ml-2 lg:ml-0 mt-8 lg:mt-0 p-3 pr-4 flex lg:block z-20 text-sm"
>
	{#each options as option}
		<label
			class={`flex items-center cursor-pointer`}
			on:mouseover={() => onHoverBegin(option)}
			on:focus={() => onHoverBegin(option)}
			on:mouseout={onHoverEnd}
			on:blur={onHoverEnd}
			value={option}
		>
			<input
				checked={clickedHighlight === option}
				on:change={() => onClick(option)}
				type="checkbox"
				name="amount"
				value={option}
				class={`${option === 'survival' ? 'accent-green-theme' : 'accent-red-theme'} relative -top-[1px]`}
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
