import type { RequestHandlerOutput } from '@sveltejs/kit';
import estimates from '$lib/data/estimates.json';
import collectionsDataTransform from '$lib/funcs/collectionsDataTransform';

export async function load(): Promise<RequestHandlerOutput> {
	let data: {
		title: string;
		link: string;
		notes: string[];
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

	return { data, time: new Date().toString() };
}
