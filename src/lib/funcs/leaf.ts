import * as d3 from 'd3';
import { curveStep } from 'd3';
import titleCase from './titleCase';
import { colorizer, familyNames } from './treeUtilities';

const roundLeaf = [
	{ x: -2, y: 0 },
	{ x: 15, y: -10 },
	{ x: 30, y: 0 },
	{ x: 15, y: 10 },
	{ x: -2, y: 0 }
];

const diamondLeaf = [
	{ x: -2, y: 0 },
	{ x: 15, y: -7 },
	{ x: 28, y: 0 },
	{ x: 15, y: 7 },
	{ x: -2, y: 0 }
];

const arrowLeaf = [
	{ x: 0, y: 0 },
	{ x: -4, y: -6 },
	{ x: 30, y: 0 },
	{ x: -4, y: 6 },
	{ x: 0, y: 0 }
];

const curveFunc = d3
	.line()
	.curve(d3.curveBasis) // This is where you define the type of curve. Try curveStep for instance.
	.x((d: any) => d.x)
	.y((d: any) => d.y);

// const catFunc = d3
// 	.line()
// 	.curve(d3.curveLinear)
// 	.x((d: any) => d.x)
// 	.y((d: any) => d.y);

const linearFunc = d3
	.line()
	.curve(d3.curveLinear)
	.x((d: any) => d.x)
	.y((d: any) => d.y);

export const goodLeaf = curveFunc(roundLeaf as any);
export const catastropheLeaf = linearFunc(diamondLeaf as any);
export const extinctionLeaf = linearFunc(arrowLeaf as any);
