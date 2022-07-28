import treeify from '$lib/funcs/treeify';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import estimates from '$lib/data/estimates.json';
import collectionsDataTransform from '$lib/funcs/collectionsDataTransform';
import toTitleCase from '$lib/funcs/titleCase';

export async function GET(): Promise<RequestHandlerOutput> {
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


		data.push({
			...collectionsDataTransform(entry.outcomes),
			title: entry.title,
			notes: entry.notes,
			link: entry.link
		});
	}

	let charts: { tree: string; title: string; notes: string[]; link: string }[] = [];
	for (const entry of data) {
		charts.push({
			tree: treeify(entry, {
				label: (d) => d.name,
				title: (d, n) => toTitleCase(d.name),
				width: 652,
				height: 652,
				margin: 50
			}),
			title: entry.title,
			notes: entry.notes || [],
			link: entry.link
		});
	}

	return {
		status: 200,
		body: { charts, time: new Date().toString() }
	};
}
