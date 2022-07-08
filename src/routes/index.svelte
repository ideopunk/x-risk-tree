<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';

	import Tree from '$lib/components/tree.svelte';

	export const prerender = true;

	export let time: string;
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

	console.log(time);
	console.log(typeof time);
</script>

<article class="w-screen text-center prose">
	<h1 class="text-center mt-8 mb-4">The Tree of Forking Paths</h1>
	<h2 class="text-center mt-1">In how many of our futures does humanity survive?</h2>
</article>

<Tree {vals} />

<article class="self-align text-justify prose py-12 prose-p:text-xl">
	<p>
		Over the next century, humanity could flourish or it could experience a global catatastrophe. It
		could even go extinct.
	</p>
	<p>
		But we are not doomed. We have the ability to prune the branches we face. We can reduce our
		existential risks until every path leads to survival.
	</p>
	<p>
		This tree is built from Metaculus's <ExternalLink
			href="https://www.metaculus.com/questions/2568">Ragnarok series</ExternalLink
		>. It is updated every night (last: {new Date(time).toDateString()}). It tracks predictions
		concerning
		<span class="text-red-500 font-bold">global catastrophes</span>
		and
		<span class="text-black font-bold">(near-)extinction events</span>.
	</p>
	<p>
		If you'd like to learn more about existential risks, see our <a
			sveltekit:prefetch
			href="faq"
			class="text-green-forest hover:text-black font-bold">FAQ</a
		>.
	</p>
</article>
