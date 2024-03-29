<script lang="ts">
	import * as d3 from 'd3';
	import Container from '$lib/components/Container.svelte';
	import InternalLink from '$lib/components/InternalLink.svelte';
	import Label from '$lib/components/Label.svelte';
	import SelfChart from '$lib/components/SelfChart.svelte';
	import selfDataTransform from '$lib/funcs/predictDataTransform';
	import toTitleCase from '$lib/funcs/titleCase';
	import treeify from '$lib/funcs/treeify';
	import SharableImg from '$lib/components/SharableImg.svelte';
	import svgToURL from '$lib/funcs/svgToURL';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { onMount } from 'svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	
	const outcomeTypes = ['extinction', 'catastrophe', 'survival', 'sustenance', 'flourishing'];
	let title = 'My Existential Risk Predictions';
	let notes = '';
	let branches: { name: string; probabilities: { name: string; percentage: number }[] }[] = [
		{ name: 'Survival', probabilities: [{ name: 'survival', percentage: 90 }] },
		{ name: 'Climate', probabilities: [{ name: 'catastrophe', percentage: 2 }] },
		{
			name: 'Nuclear War',
			probabilities: [
				{ name: 'extinction', percentage: 1 },
				{ name: 'catastrophe', percentage: 1 }
			]
		},
		{ name: 'Bioengineering', probabilities: [{ name: 'extinction', percentage: 2 }] },
		{ name: 'Nanotechnology', probabilities: [{ name: 'extinction', percentage: 2 }] },
		{ name: 'Artificial Intelligence', probabilities: [{ name: 'extinction', percentage: 2 }] }
	];

	let input = selfDataTransform(branches);
	let chart: SVGSVGElement | null = null;

	onMount(() => {
		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) => toTitleCase(d.name),
			width: 612,
			height: 612,
			margin: 50,
			classes: 'instant'
		});
	});

	function handleCreate() {
		let input = selfDataTransform(branches);
		chart = treeify(input, {
			label: (d) => d.name,
			title: (d, n) => toTitleCase(d.name),
			width: 612,
			height: 612,
			margin: 50,
			classes: 'instant'
		});
	}

	function addBranch() {
		branches.push({ name: '', probabilities: [{ name: 'extinction', percentage: 1 }] });
		branches = branches;
	}

	function removeBranch(ind: number) {
		branches = [...branches.slice(0, ind), ...branches.slice(ind + 1, branches.length)];
	}

	function addOutcome(branchInd: number) {
		branches[branchInd].probabilities.push({ name: 'catastrophe', percentage: 1 });
		branches = branches;
	}

	function removeOutcome(branchInd: number, outcomeInd: number) {
		const probs = branches[branchInd].probabilities;
		branches[branchInd].probabilities = [
			...probs.slice(0, outcomeInd),
			...probs.slice(outcomeInd + 1, probs.length)
		];
		branches = branches;
	}

	let url = '';
	// for some reason this only works when the img is truly rendered to the dom, so logic is split between components ¯\_(ツ)_/¯
	async function handleShare() {
		url = svgToURL('svg.treeSVG');
	}
</script>

<svelte:head>
	<link rel="canonical" href="https://possibleworldstree.com/predict" />
	<title>The Possible Worlds Tree / Predict</title>
</svelte:head>

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

		<div class="pt-4">
			<article class="prose">
				<p>Create your own prediction tree.</p>
			</article>
			<div class="pb-4 mb-4">
				<button
					on:click={handleCreate}
					class="bg-green-theme mt-4 px-4 py-2 hover:bg-green-700 transition-all text-2xl rounded-sm cursor-pointer w-full"
					>Predict</button
				>
			</div>

			<!-- <article class="prose mt-4">
				<p class="mb-12">
					If you would like to contribute to the Possible Worlds Tree, you can do so by making
					predictions in <ExternalLink href="https://www.metaculus.com/questions/2568"
						>Metaculus's Ragnarok Series</ExternalLink
					>.
				</p>
			</article> -->
			<Label htmlFor="title">Title</Label>

			<input
				id="title"
				bind:value={title}
				class="block border-white border-dashed border hover:border-black transition-colors border-b-black mb-4  w-full"
			/>
			<Label htmlFor="notes">Notes</Label>
			<input
				id="notes"
				bind:value={notes}
				class="block border-white border-dashed border hover:border-black transition-colors border-b-black mb-12 w-full"
			/>

			<fieldset>
				<div class="flex justify-between items-center">
					<Label legend>Branches</Label>
					<div class="flex ml-4">
						<button on:click={addBranch} class="w-6 h-6 hover:scale-110 transition-transform"
							><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
								><title>Add Branch</title><path
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
				{#each branches as branch, i}
					<div class="border-neutral-400 border-t-2 pt-6 mt-4">
						<div class="flex justify-between items-center">
							<!-- <Label htmlFor="branchName" size="md">Branch Name</Label> -->
							<input
								id="branchName"
								bind:value={branch.name}
								class="block border-white border-dashed border hover:border-black transition-colors border-b-black mb-4"
							/>

							<button
								on:click={() => removeBranch(i)}
								class="w-6 h-6 hover:scale-110 transition-transform"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
									><title>Remove Branch</title><path
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

						<div class="ml-16">
							<div class="flex justify-between mb-2">
								<Label size="sm">Outcomes</Label>
								<button
									on:click={() => addOutcome(i)}
									class="w-4 h-4 relative -right-6 hover:scale-110 transition-transform"
									><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
										><title>Add Outcome</title><path
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
							{#each branch.probabilities as outcome, j}
								<div class="flex justify-between mb-3 relative">
									<div>
										<!-- <Label htmlFor={'type' + i + j} size="sm">Outcome Type</Label> -->

										<select
											id={'type' + i + j}
											bind:value={outcome.name}
											class="bg-white border-white border-dashed border hover:border-black transition-colors border-b-black"
										>
											{#each outcomeTypes as outcome}
												<option value={outcome}>{toTitleCase(outcome)}</option>
											{/each}
										</select>
									</div>
									<div class="flex">
										<!-- <Label htmlFor={'percentage' + i + j} size="sm">Percentage</Label> -->
										<input
											id={'percentage' + i + j}
											type="number"
											step="1"
											min="1"
											max="100"
											class="block w-16 border-white border-dashed border hover:border-black transition-colors border-b-black"
											bind:value={outcome.percentage}
										/>
										<span>%</span>
									</div>
									<button
										on:click={() => removeOutcome(i, j)}
										class="absolute -right-6 w-4 h-4 z-10 self-center hover:scale-110 transition-transform"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
											><title>Remove Outcome</title><path
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
							{/each}
						</div>
					</div>
				{/each}
			</fieldset>
		</div>
	</div>
	<div slot="right" class="fixed">
		<h3 class={`text-center self-center text-2xl mt-16 lg:mt-0 mb-1`}>
			{title}
		</h3>
		<p class="text-xs text-center">{notes}</p>
		{#if chart}
			<SelfChart {chart} />

			<ShareButton {handleShare} />
			{#if url}
				<SharableImg {url} />
			{/if}
		{/if}
	</div>
</Container>
