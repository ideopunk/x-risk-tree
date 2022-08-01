<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import InternalLink from '$lib/components/InternalLink.svelte';
	import Label from '$lib/components/Label.svelte';
	import SelfChart from '$lib/components/SelfChart.svelte';
	import selfDataTransform from '$lib/funcs/selfDataTransform';
	import toTitleCase from '$lib/funcs/titleCase';
	import treeify from '$lib/funcs/treeify';

	let chart: SVGSVGElement | null = null;
	let title = 'My Existential Risk Predictions';
	let notes = '';
	let outcomes: { name: string; probabilities: { name: string; percentage: number }[] }[] = [
		{ name: '', probabilities: [{ name: '', percentage: 0 }] }
	];
	function handleCreate() {
		let input = selfDataTransform(outcomes);
		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) => toTitleCase(d.name),
			width: 632,
			height: 632,
			margin: 50,
			classes: "instant"
		});

	}

	function addOutcome() {
		console.log('add outcome');
		outcomes.push({ name: '', probabilities: [{ name: '', percentage: 0 }] });
		outcomes = outcomes;
	}

	function removeOutcome(ind: number) {
		outcomes = [...outcomes.slice(0, ind), ...outcomes.slice(ind, outcomes.length - 1)];
	}
</script>

<Container>
	<div class="w-[65ch] lg:w-full pl-0 lg:pl-24 pr-8 " slot="left">
		<div class="flex gap-3 mb-4">
			<div class="text-xl">
				<InternalLink href="/">Home</InternalLink>
			</div>
			<div class="text-xl">
				<InternalLink href="/faq">FAQ</InternalLink>
			</div>
			<div class="text-xl">
				<InternalLink href="/collection">Collection</InternalLink>
			</div>
		</div>

		<form on:submit|preventDefault={handleCreate}>
			<Label htmlFor="title">Title</Label>

			<input id="title" bind:value={title} class="block border-b border-dashed border-black mb-4" />
			<Label htmlFor="notes">Notes</Label>
			<input id="notes" bind:value={notes} class="block border-b border-dashed border-black mb-4" />

			<fieldset>
				<div class="flex justify-between items-center">
					<Label legend>Branches</Label>
					<div class="flex ml-4">
						<button on:click={addOutcome} class="w-6 h-6"
							><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
								><title>Add Circle</title><path
									d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
									fill="none"
									stroke="currentColor"
									stroke-miterlimit="10"
									stroke-width="32"
								/><path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="32"
									d="M256 176v160M336 256H176"
								/></svg
							></button
						>
					</div>
				</div>
				{#each outcomes as outcome, i}
					<div class="border-black border-t-2 pt-4 rounded-sm mt-4">
						<div class="flex justify-between items-center">
							<Label size="md">Branch Name</Label>
							<button on:click={() => removeOutcome(i)} class="w-6 h-6">
								<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
									><title>Remove Circle</title><path
										d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
										fill="none"
										stroke="currentColor"
										stroke-miterlimit="10"
										stroke-width="32"
									/><path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="32"
										d="M336 256H176"
									/></svg
								>
							</button>
						</div>
						<input
							bind:value={outcomes[i].name}
							class="block border-b border-dashed border-black mb-4"
						/>
						<div class="flex justify-between">
							<div class="ml-16">
								<Label size="sm">Outcome Name</Label>

								<input
									class="block border-b border-dashed border-black"
									bind:value={outcomes[i].probabilities[0].name}
								/>
							</div>
							<div>
								<Label size="sm">Percentage</Label>
								<input
									class="block w-20 border-b border-dashed border-black"
									bind:value={outcomes[i].probabilities[0].percentage}
								/>
							</div>
						</div>
					</div>
				{/each}
			</fieldset>

			<input
				type="submit"
				class="bg-green-theme mt-4 px-4 py-2 hover:bg-green-700 transition-all rounded-sm cursor-pointer"
				value="Create"
			/>
		</form>
	</div>
	<div slot="right">
		<h3 class={`text-center self-center text-2xl mt-16 lg:mt-0 mb-1`}>
			{title}
		</h3>
		<p class="text-xs text-center">{notes}</p>
		{#if chart}
			<SelfChart {chart} />
		{/if}
	</div>
</Container>
