import * as d3 from 'd3';

const duration = 2000;

export function animateInnerPaths() {
	const selector = 'path.inner';

	const svgpaths: SVGPathElement[] = (d3.selectAll(selector) as any)._groups[0];
	let lengths: number[] = [];
	for (let path of svgpaths) {
		lengths.push(path.getTotalLength());
	}

	// Animate the path by setting the initial offset and dasharray and then transition the offset to 0
	// const datapaths = d3.selectAll(selector);
	// datapaths
	// 	.attr('stroke-dasharray', (d: any, n) => {
	// 		const length = lengths[n];
	// 		return length + ' ' + length;
	// 	})
	// 	.attr('stroke-dashoffset', (d: any, n) => lengths[n]);
}
export function animateOuterPaths() {
	const selector = 'path.outer';

	const svgpaths: SVGPathElement[] = (d3.selectAll(selector) as any)._groups[0];
	let lengths: number[] = [];
	for (let path of svgpaths) {
		lengths.push(path.getTotalLength());
	}

	// Animate the path by setting the initial offset and dasharray and then transition the offset to 0
	// const datapaths = d3.selectAll(selector);
	// datapaths
	// 	.attr('stroke-dasharray', (d: any, n) => {
	// 		const length = lengths[n];
	// 		return length + ' ' + length;
	// 	})
	// 	.attr('stroke-dashoffset', (d: any, n) => lengths[n]);
}
