import treeify from '$lib/funcs/treeify';

import type { RequestHandlerOutput } from '@sveltejs/kit';
import estimates from '$lib/data/estimates.json';
import collectionsDataTransform from '$lib/funcs/collectionsDataTransform';

export async function get(): Promise<RequestHandlerOutput> {
	let charts: { tree: string; title: string; notes: string[]; link: string }[] = [];

	for (const entry of estimates) {
		charts.push({
			tree: treeify(collectionsDataTransform('the future', entry.outcomes), {
				label: (d) => d.name,
				title: (d, n) => d.name,
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
