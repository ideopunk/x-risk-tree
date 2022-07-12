import * as d3 from 'd3';

const leaf = [
	{ x: 0, y: 0 },
	{ x: 15, y: -10 },
	{ x: 30, y: 0 },
	{ x: 15, y: 10 },
	{ x: 0, y: 0 }
];

const curveFunc = d3
	.line()
	.curve(d3.curveBasis) // This is where you define the type of curve. Try curveStep for instance.
	.x((d: any) => d.x)
	.y((d: any) => d.y);

// Adapted from Mike Bostock's Radial Tidy Tree layout
// Copyright 2022 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/radial-tree
export default function treeify(
	data,
	{
		// data is either tabular (array of objects) or hierarchy (nested objects)
		path = undefined, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
		id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
		parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
		children = undefined, // if hierarchical data, given a d in data, returns its children
		tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
		separation = tree === d3.tree
			? (a, b) => (a.parent == b.parent ? 1 : 2) / a.depth
			: (a, b) => (a.parent == b.parent ? 1 : 2),
		sort = null, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
		label = null, // given a node d, returns the display name
		title = null, // given a node d, returns its hover text
		link = null, // given a node d, its link (if any)
		linkTarget = '_blank', // the target attribute for links (if any)
		width = 640, // outer width, in pixels
		height = 400, // outer height, in pixels
		margin = 60, // shorthand for margins
		marginTop = margin, // top margin, in pixels
		marginRight = margin, // right margin, in pixels
		marginBottom = margin, // bottom margin, in pixels
		marginLeft = margin, // left margin, in pixels
		radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2, // outer radius
		r = 3, // radius of nodes
		padding = 1, // horizontal padding for first and last column
		fill = '#999', // fill for nodes
		// fillOpacity, // fill opacity for nodes
		stroke = '#555', // stroke for links
		strokeWidth = 2.5, // stroke width for links
		strokeOpacity = 0.6, // stroke opacity for links
		strokeLinejoin = 2, // stroke line join for links
		strokeLinecap = 2, // stroke line cap for links
		halo = '#fff', // color of label halo
		haloWidth = 3 // padding around the labels
	}: {
		path?: any; // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
		id?: ((d: any) => any) | null; // if tabular data, given a d in data, returns a unique identifier (string)
		parentId?: ((d: any) => any) | null; // if tabular data, given a node d, returns its parent’s identifier
		children?: any; // if hierarchical data, given a d in data, returns its children
		tree?: <Datum>() => d3.TreeLayout<Datum>; // layout algorithm (typically d3.tree or d3.cluster)
		separation?: (a: any, b: any) => number;
		sort?: null | ((d: any) => any); // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
		label: ((d: any) => any) | null; // given a node d, returns the display name
		title: ((d: any, n: any) => string) | null; // given a node d, returns its hover text
		link: ((d: any, n: any) => string) | null; // given a node d, its link (if any)
		linkTarget?: string; // the target attribute for links (if any)
		width?: number; // outer width, in pixels
		height?: number; // outer height, in pixels
		margin?: number; // shorthand for margins
		marginTop?: number; // top margin, in pixels
		marginRight?: number; // right margin, in pixels
		marginBottom?: number; // bottom margin, in pixels
		marginLeft?: number; // left margin, in pixels
		radius?: number;
		r?: number; // radius of nodes
		padding?: number; // horizontal padding for first and last column
		fill?: string; // fill for nodes
		// fillOpacity, // fill opacity for nodes
		stroke?: string; // stroke for links
		strokeWidth?: number; // stroke width for links
		strokeOpacity?: number; // stroke opacity for links
		strokeLinejoin?: number; // stroke line join for links
		strokeLinecap?: number; // stroke line cap for links
		halo?: string; // color of label halo
		haloWidth?: number; // padding around the labels
	}
) {
	// If id and parentId options are specified, or the path option, use d3.stratify
	// to convert tabular data to a hierarchy; otherwise we assume that the data is
	// specified as an object {children} with nested objects (a.k.a. the “flare.json”
	// format), and use d3.hierarchy.
	const root =
		path != null
			? d3.stratify().path(path)(data)
			: id !== null && parentId !== null
			? d3.stratify().id(id).parentId(parentId)(data)
			: d3.hierarchy(data, children);

	// Sort the nodes.
	if (sort != null) root.sort(sort);

	// Compute labels and titles.
	const descendants = root.descendants();
	const L = label === null ? null : descendants.map((d) => label(d.data));
	// const L = label === null ? null : descendants.map((d) => label(d.data, d));

	// Compute the layout.
	tree()
		.size([2 * Math.PI, radius])
		.separation(separation)(root);

	// CONTAINER AND TEXT STYLE
	const svg = d3
		.create('svg')
		.attr('viewBox', [-marginLeft - radius, -marginTop - radius, width, height])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
		.attr('font-family', 'sans-serif')
		.attr('font-size', 12);

	// BACKGROUND
	// svg.append('circle').attr('fill', 'rgba(197, 239, 247,1)').attr('r', width / Math.PI)

	// LINES
	svg
		.append('g')
		.attr('fill', 'none')
		.attr('stroke-opacity', strokeOpacity)
		.attr('stroke-linecap', strokeLinecap)
		.attr('stroke-linejoin', strokeLinejoin)
		.attr('stroke-width', strokeWidth)
		.selectAll('path')
		.data(root.links())
		.join('path')
		.attr(
			'd',
			d3
				.linkRadial()
				.angle((d: any) => d.x)
				.radius((d: any) => d.y) as any
		)
		.attr('stroke', (d: any, i) => {
			const targetName = d.target.data.name;
			return targetName === 'Survival' ? 'green' : targetName === 'Extinction' ? 'black' : 'red';
		})
		.attr('class', (d: any, i) => (d.target.height ? 'inner' : 'outer')); // class is used for conditionally animating

	// LINKS
	const node = svg
		.append('g')
		.selectAll('a')
		.data(root.descendants())
		.join('a')
		.attr('rel', 'external')
		.attr('tabindex', (d: any, n) => {
			return d.depth === 2 && d.data.name !== 'Extinction' ? '-1' : '0';
		})
		.attr('href', link == null ? null : (d) => link(d.data, d))

		.attr('target', link == null ? null : linkTarget)
		.attr('transform', (d: any) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
		.attr('class', (d, n) => (d.height ? 'inner' : 'outer')); // class is used later for conditionally attaching text to anchors

	const outerAnchors = svg.selectAll('a.outer');
	const innerAnchors = svg.selectAll('a.inner');

	// DOTS
	innerAnchors
		.append('circle')
		.attr('fill', (d: any, i) => {
			if (d.height === 2) return 'orange'; // the future

			const name = d.data.name;
			return name === 'Survival' ? 'green' : name === 'Extinction' ? 'brown' : 'red';
		})
		.attr('r', r);

	// LEAVES

	outerAnchors
		.append('path')
		.attr('d', curveFunc(leaf as any))
		.attr('fill', (d: any, i) => {
			const name = d.data.name;
			return name === 'Survival' ? 'green' : name === 'Extinction' ? 'black' : 'red';
		})
		.attr('opacity', 0.8)
		.attr('r', r)
		.attr('class', 'leaf'); // class is used for conditionally animating

	// TITLE
	if (title != null) node.append('title').text((d) => title(d.data, d));

	// TEXT
	if (L)
		innerAnchors
			.append('text')
			.attr('transform', (d: any) => `rotate(${d.x >= Math.PI ? 180 : 0})`)
			.attr('dy', '0.32em')
			.attr('x', (d: any) => (d.x < Math.PI === !d.children ? 6 : -6))
			.attr('text-anchor', (d: any) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
			.attr('paint-order', 'stroke')
			.attr('stroke', halo)
			.attr('stroke-width', haloWidth)
			.text((d, i) => L[i]);

	return svg.node();
}