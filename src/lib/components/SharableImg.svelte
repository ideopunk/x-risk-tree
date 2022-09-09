<!-- this is a crazy work around for something -->
<script lang="ts">
	import { notifications } from '$lib/funcs/notification';

	export let url = '';
	// export let canvasURL = '';
	export let setCanvasURL: ((s: string) => void) | null = null;

	let img: HTMLImageElement;

	async function handleLoad(e) {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		// Set width and height
		canvas.width = img.width;
		canvas.height = img.height;
		// Draw the image

		if (!ctx) return;
		ctx.drawImage(img, 0, 0);

		let url = canvas.toDataURL('image/png');

		if (!url) throw new Error('no data url found');

		if (setCanvasURL) {
			setCanvasURL(url);
		}
	}
</script>

<!-- for now making this way off screen  -->
<div id="fake" class="absolute top-16 left-[200vw] opacity-0 w-[632px] overflow-hidden z-0">
	<img
		id="sharable"
		class="absolute left-[200vw]"
		src={url}
		bind:this={img}
		on:load={(e) => handleLoad(e)}
		width={632}
		height={632}
		alt="My Existential Risk Predictions"
	/>
	<!-- <img
		id="sharable"
		src={canvasURL}
		width={632}
		height={632}
		alt="My Existential Risk Predictions"
	/> -->
</div>
