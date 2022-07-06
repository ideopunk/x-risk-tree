<script>
	import Answer from '../lib/components/answer.svelte';
	import Question from '../lib/components/question.svelte';
</script>

<article class="prose">
	<Question>eh?</Question>
	<Answer>sure?</Answer>

	<Question>Can I see the code?</Question>
	<Answer
		>Yes, <a rel="external">right here</a>.<span
			>{`The tree is based on Mike Bostock's Radial Tidy Tree layout (Copyright 2022 Observable, Inc. Released under the ISC license. https://observablehq.com/@d3/radial-tree
	)`}</span
		></Answer
	>
</article>
