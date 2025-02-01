import type { TreeData } from '$lib/types';

export default function selfDataTransform(
	input: {
		name: string;
		probabilities: {
			name: string;
			percentage: number;
		}[];
	}[]
): TreeData {
	const ch = input.map((i) => {
		return {
			name: i.name,
			children: i.probabilities
				.map((prob) =>
					Array.from({ length: prob.percentage }).map(() => {
						return { name: prob.name };
					})
				)
				.flat()
		};
	});
	return { name: '2025', children: ch };
}
