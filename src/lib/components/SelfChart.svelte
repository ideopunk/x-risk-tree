<script lang="ts">
	import { onMount } from 'svelte';

	export let chart: SVGSVGElement | null = null;

	onMount(() => {
		const paths: NodeListOf<SVGPathElement> = document.querySelectorAll('path.line'); // using the classname confuses typescript
		paths.forEach((p) => {
			p.classList.add('instant');
		});

		const texts = document.querySelectorAll('text');
		texts.forEach((t) => {
			t.classList.add('instant');
		});

		const svgs = document.querySelectorAll('svg');
		svgs.forEach((s) => {
			s.classList.add('instant');
		});
	});
</script>

{@html chart?.outerHTML}
