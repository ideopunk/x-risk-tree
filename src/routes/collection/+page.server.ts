import estimates from '$lib/data/estimates.json';
import collectionsDataTransform from '$lib/funcs/collectionsDataTransform';

export async function load(): Promise<any> {
	let info: {
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
		info.push({
			...collectionsDataTransform(entry.outcomes),
			title: entry.title,
			notes: entry.notes,
			link: entry.link
		});
	}

	return { info, time: new Date().toString() };
}
