import type { TreeData } from '../types';

export default function metaculusDataTransform(vals: {
	total: number;
	climate: { catastrophe: number; extinction: number };
	nanotechnology: { catastrophe: number; extinction: number };
	'nuclear war': { catastrophe: number; extinction: number };
	'artificial intelligence': { catastrophe: number; extinction: number };
	bioengineering: { catastrophe: number; extinction: number };
}): TreeData {
	let tree: TreeData = {
		name: 'the future',
		children: [
			{ name: 'survival', children: [{name: "catastrophe", children: []}] },
			{ name: 'extinction', children: [] }
		]
	};

	for (const pair of Object.entries(vals)) {
		// survival
		if (pair[0] === 'total') {
			const leaves = Array.from({ length: 100 - vals.total }).map(() => {
				return { name: 'sustenance' };
			});

			tree.children[0].children.push({ name: 'sustenance', children: leaves });
		} else {
			if (typeof pair[1] === 'number') {
				throw new Error(
					`${pair[0]} should have a value with a catastrophe and an extinction, not just a number`
				);
			}
			const catastrophes = Array.from({ length: pair[1].catastrophe }).map(() => {
				return { name: 'catastrophe' };
			});

			const extinctions = Array.from({ length: pair[1].extinction }).map(() => {
				return { name: 'extinction' };
			});

			tree.children[0].children[0].children.push({ name: pair[0], children: catastrophes });
			tree.children[1].children.push({ name: pair[0], children: extinctions });
		}
	}

	return tree;
}
