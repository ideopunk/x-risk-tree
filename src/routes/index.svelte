<script lang="ts">
	import Tree from '$lib/components/tree.svelte';

	export const prerender = true;

	export let vals: {
		total: number;
		climate: number;
		climateX: number;
		nano: number;
		nanoX: number;
		nuke: number;
		nukeX: number;
		ai: number;
		aiX: number;
		bio: number;
		bioX: number;
	};

</script>

<article class="w-full">
	<h1>Ayoooo</h1>

	<Tree {vals} />
	<p>
		For more, see our <a sveltekit:prefetch href="faq" class="text-green-forest font-bold">FAQ</a>
	</p>
</article>
