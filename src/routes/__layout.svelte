<script>
	import '../app.css';
</script>

<svelte:head>
	<title>The Tree of Forking Paths</title>
	<meta name="title" content="The Tree of Forking Paths" />
	<meta name="description" content="In how many of our branching paths does humanity survive?" />

	<meta name="og:title" content="The Tree of Forking Paths" />
	<meta name="og:description" content="In how many of our branching paths does humanity survive?" />
	<meta name="og:url" content="https://x-risk-tree.vercel.app/" />
	<meta name="og:type" content="website" />

	<meta name="og:image" content="https://x-risk-tree.vercel.app/tree.png" />
	<meta name="og:image:alt" content="A tree symbolizing humanity's possible futures" />
	<meta name="og:image:width" content="773" />
	<meta name="og:image:height" content="773" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ideopunk" />
</svelte:head>

<div class="flex flex-col w-full items-center overflow-x-hidden">
	<slot />
</div>
