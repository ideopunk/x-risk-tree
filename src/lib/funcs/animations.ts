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
	const datapaths = d3.selectAll(selector);
	datapaths
		.attr('stroke-dasharray', (d: any, n) => {
			const length = lengths[n];
			return length + ' ' + length;
		})
		.attr('stroke-dashoffset', (d: any, n) => lengths[n])
		.transition()
		.ease(d3.easeLinear)
		.attr('stroke-dashoffset', 0)
		.duration(duration);

	// DOT ANIMATION
	// const dots = d3.selectAll('circle')

	// TEXT ANIMATION
	const texts = d3.selectAll('text, circle');
	texts
		.attr('opacity', 0)
		.transition()
		.ease(d3.easeLinear)
		.attr('opacity', 0.8)
		.duration(duration * 1.5);
}
export function animateOuterPaths() {
	const selector = 'path.outer';

	const svgpaths: SVGPathElement[] = (d3.selectAll(selector) as any)._groups[0];
	let lengths: number[] = [];
	for (let path of svgpaths) {
		lengths.push(path.getTotalLength());
	}

	// Animate the path by setting the initial offset and dasharray and then transition the offset to 0
	const datapaths = d3.selectAll(selector);
	datapaths
		.attr('stroke-dasharray', (d: any, n) => {
			const length = lengths[n];
			return length + ' ' + length;
		})
		.attr('stroke-dashoffset', (d: any, n) => lengths[n])
		.transition()
		.delay(duration)
		.ease(d3.easeLinear)
		.attr('stroke-dashoffset', 0)
		.duration(duration);
}
export function animateLeaves() {
	const selector = 'path.leaf';

	const datapaths = d3.selectAll(selector);
	datapaths
		.attr('opacity', 0)
		.attr('transform', (d: any) => `scale(0.1)`)
		.transition()
		.delay(duration * 2 - (duration * 0.1))
		.ease(d3.easeLinear)
		.attr('opacity', 0.8)
		.attr('transform', (d: any) => `scale(1)`)

		.duration(duration * 0.8);
}
