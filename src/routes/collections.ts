import treeify from '$lib/funcs/treeify';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import estimates from '$lib/data/estimates.json';
import estimateToObject from '$lib/funcs/estimateToObject';

export async function get(): Promise<RequestHandlerOutput> {
	let data: {
		name: string;
		children: {
			name: string;
			children: {
				name: string;
			}[];
		}[];
	}[] = [];
	for (const entry of estimates) {
		const sum = entry.outcomes.reduce((prev, curr) => curr.probability + prev, 0);
		if (Math.abs(100 - sum) > 1) {
			throw new Error(
				`Outcome probabilities must sum to ~100. For ${entry.name}'s predictions they instead summed to ${sum}`
			);
		}

		data.push(estimateToObject(entry.outcomes));
	}

	let charts: string[] = [];
	for (const entry of data) {
		charts.push(
			treeify(entry, {
				label: (d) => d.name,
				title: (d, n) => d.name,
				totalLink: 'https://slatestarcodex.com/2020/04/01/book-review-the-precipice/',
				width: 652,
				height: 652,
				margin: 50
			})
		);
	}

	return {
		status: 200,
		body: {
			charts: JSON.stringify(charts),
			time: new Date().toString()
		}
	};
}