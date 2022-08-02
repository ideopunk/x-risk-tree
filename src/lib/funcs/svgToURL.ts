// side effects!!
// for some reason this only works when the img is truly rendered to the dom, so logic is split between components ¯\_(ツ)_/¯
export default function svgToURL(selector: string) {
	// const copy = JSON.parse(JSON.stringify(chart));
	// todo make sure this only grabs the copy's paths
	const paths = document.querySelectorAll('path');
	paths.forEach((path) => {
		path.setAttribute('class', '');
		path.setAttribute('stroke-dasharray', '0');
		path.setAttribute('stroke-dashoffset', '0');
	});

	const svg = document.querySelector(selector);

	if (!svg) throw new Error('could not select SVG');

	const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
	return URL.createObjectURL(blob);
}
