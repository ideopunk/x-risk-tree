<script lang="ts">
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
			if (!!navigator.share) {
				const filesArray = [
					new File([blob], 'xrisk.png', {
						type: 'image/png',
						lastModified: new Date().getTime()
					})
				];

				await navigator.share({ files: filesArray, title: 'test!' });
			} else {
				const clipboardItem = new ClipboardItem({ [blob.type]: blob });

				await navigator.clipboard.write([clipboardItem]);
			}
			alert('Copied');
		} else {
			alert('Cannot copy, requires secure context');
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
