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

<article class="w-screen text-center prose ">
	<h1 class="text-center mt-8">In how many of our branching paths does humanity survive?</h1>
</article>

<Tree {vals} />

<article class="w-full prose pb-12">
	<p>This tree is built from Metaculus's Ragnarok series. It is updated every night.</p>
	<p>
		For more, see our <a sveltekit:prefetch href="faq" class="text-green-forest hover:text-black font-bold">FAQ</a>.	
	</p>
</article>
