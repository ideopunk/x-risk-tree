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

<form class="absolute top-4 left-4 ">
	{#each options as option}
		<label
			class={`block hover:underline ${clickedHighlight === option && 'underline'} cursor-pointer`}
			on:mouseover={() => onHoverBegin(option)}
			on:focus={() => onHoverBegin(option)}
			on:mouseout={onHoverEnd}
			on:blur={onHoverEnd}
			value={option}
			><input
				checked={clickedHighlight === option}
				on:change={() => onClick(option)}
				type="checkbox"
				name="amount"
				value={option}
				class={`${clickedHighlight === option ? 'border' : ''} opacity-0`}
			/>{toTitleCase(option)}
		</label>
	{/each}
</form>
