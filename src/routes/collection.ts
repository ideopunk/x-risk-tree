import treeify from '$lib/funcs/treeify';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import estimates from '$lib/data/estimates.json';
import collectionsDataTransform from '$lib/funcs/collectionsDataTransform';

export async function get(): Promise<RequestHandlerOutput> {
	let data: {
		title: string;
		link: string;
		notes?: string[];
		name: string; // the future
		children: {
			name: string;
			children: {
				name: string;
			}[];
		}[];
	}[] = [];

	for (const entry of estimates) {
		// const sum = entry.outcomes.reduce((prev, curr) => curr + prev, 0);
		// if (Math.abs(100 - sum) > 1) {
		// 	throw new Error(
		// 		`Outcome probabilities must sum to ~100. For ${entry.name}'s predictions they instead summed to ${sum}`
		// 	);
		// }

		data.push({
			...collectionsDataTransform(entry.outcomes),
			title: entry.title,
			notes: entry.notes,
			link: entry.link
		});
	}

	let charts: { tree: string; title: string; notes: string[] }[] = [];
	for (const entry of data) {
		console.log(entry.children);
		charts.push({
			tree: treeify(entry, {
				label: (d) => d.name,
				title: (d, n) => d.name,
				totalLink: entry.link,
				width: 652,
				height: 652,
				margin: 50
			}),
			title: entry.title,
			notes: entry.notes || []
		});
	}

	return {
		status: 200,
		body: { charts, time: new Date().toString() }
	};
}
