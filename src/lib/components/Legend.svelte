<script lang="ts">
	import type { Highlight } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let hoverHighlight: Highlight = '';
	let clickedHighlight: Highlight = '';

	$: {
		dispatch('message', { highlight: hoverHighlight ? hoverHighlight : clickedHighlight });
	}

	function onClick(e: any) {
		if (clickedHighlight !== e.target.value) {
			clickedHighlight = e.target.value;
		} else {
			clickedHighlight = '';
		}
	}

	function onHoverBegin(e: MouseEvent | FocusEvent) {
		hoverHighlight = (e.target as any).value;
	}

	function onHoverEnd() {
		hoverHighlight = '';
	}
</script>

<form class="absolute top-4 left-4 ">
	<label class="block">
		<input
			checked={clickedHighlight === 'survival'}
			on:change={onClick}
			on:mouseover={onHoverBegin}
			on:focus={onHoverBegin}
			on:mouseout={onHoverEnd}
			on:blur={onHoverEnd}
			type="checkbox"
			name="amount"
			value="survival"
			class={`${clickedHighlight === 'survival' ? 'border' : ''}`}
		/> Survival
	</label>
	<label class="block">
		<input
			checked={clickedHighlight === 'extinction'}
			on:change={onClick}
			on:mouseover={onHoverBegin}
			on:focus={onHoverBegin}
			on:mouseout={onHoverEnd}
			on:blur={onHoverEnd}
			type="checkbox"
			name="amount"
			value="extinction"
			class={`${clickedHighlight === 'extinction' ? 'border' : ''}`}
		/> Extinction
	</label>
</form>
