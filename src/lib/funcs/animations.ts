import * as d3 from 'd3';

const duration = 2000;

export function animateInnerPaths() {
	// Animate the path by setting the initial offset and dasharray and then transition the offset to 0
	const svgpaths: SVGPathElement[] = (d3.selectAll('path .inner') as any)._groups[0];
	let lengths: number[] = [];
	for (let path of svgpaths) {
		lengths.push(path.getTotalLength());
	}
	const datapaths = d3.selectAll('path');
	datapaths
		.attr('stroke-dasharray', (d: any, n) => {
			console.log(d);
			const length = lengths[n];
			return length + ' ' + length;
		})
		.attr('stroke-dashoffset', (d: any, n) => {
			return lengths[n];
		})
		.transition()
		.ease(d3.easeLinear)
		.attr('stroke-dashoffset', 0)
		.duration(duration);
}
export function animateOuterPaths() {
	// Animate the path by setting the initial offset and dasharray and then transition the offset to 0
	const svgpaths: SVGPathElement[] = (d3.selectAll('path .outer') as any)._groups[0];
	let lengths: number[] = [];
	for (let path of svgpaths) {
		lengths.push(path.getTotalLength());
	}
	const datapaths = d3.selectAll('path');
	datapaths
		.attr('stroke-dasharray', (d: any, n) => {
			console.log(d);
			const length = lengths[n];
			return length + ' ' + length;
		})
		.attr('stroke-dashoffset', (d: any, n) => {
			return lengths[n];
		})
		.transition()
		.delay(duration)
		.ease(d3.easeLinear)
		.attr('stroke-dashoffset', 0)
		.duration(duration);
}
export function animateLeaves() {}
