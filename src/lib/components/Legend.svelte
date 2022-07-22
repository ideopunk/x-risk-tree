<script lang="ts">
	type Highlight = 'survival' | 'extinction' | '';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	
	let set = false;
	let hoverHighlight: Highlight = '';
	let clickedHighlight: Highlight = '';
	$: currHighlight = hoverHighlight ? hoverHighlight : clickedHighlight;

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
			class={`${currHighlight === 'survival' ? 'border' : ''}`}
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
			class={`${currHighlight === 'extinction' ? 'border' : ''}`}
		/> Extinction
	</label>
</form>
