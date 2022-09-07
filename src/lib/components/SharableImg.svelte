<!-- this is a crazy work around for something -->
<script lang="ts">
	import { notifications } from '$lib/funcs/notification';

	export let url = '';

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
		const res = await fetch(url);

		const blob = await res.blob();

		if (window.isSecureContext) {
			// on windows there's a share menu popup we don't want, we want the simple clipboard copy. 
			// debatable whether we want share menu on mobile, but I think that behavior is more expected there.
			if (!!navigator.share && !navigator.platform.includes("win")) {
				const filesArray = [
					new File([blob], 'possibleworlds.png', {
						type: 'image/png',
						lastModified: new Date().getTime()
					})
				];

				await navigator.share({ files: filesArray, title: 'Possible Futures' });
			} else {
				const clipboardItem = new ClipboardItem({ [blob.type]: blob });

				await navigator.clipboard.write([clipboardItem]);
			}
			// alert('Copied');
			notifications.send('Copied');
		} else {
			notifications.send('Cannot copy, requires secure context');
		}
	}
</script>

<img
	src={url}
	bind:this={img}
	on:load={(e) => handleLoad(e)}
	width={632}
	height={632}
	class="hidden"
	alt="My Existential Risk Predictions"
/>
