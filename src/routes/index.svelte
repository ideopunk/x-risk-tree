<script lang="ts">
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

	console.log({ vals });
</script>

<article class="w-full">
	<h1>Ayoooo</h1>
	<div class="border-2 w-full">
		<p class="w-full break-words">{Object.entries(vals)}</p>
	</div>
	<p>
		For more, see our <a sveltekit:prefetch href="faq" class="text-green-forest font-bold">FAQ</a>
	</p>
</article>
