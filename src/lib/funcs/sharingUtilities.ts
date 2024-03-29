// xmlns attribute must be included on svg
// xmlns="http://www.w3.org/2000/svg"
export function svgToImage(svg: string) {
	{
		const blob = new Blob([svg], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const image = document.createElement('img');
		image.src = url;
	}
}
