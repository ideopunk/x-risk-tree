import type { TreeData } from '../types';

export default function transform(key: string, value: number | Object) {
	if (typeof value === 'object') {
		return {
			name: key,
			children: Object.entries(value)
				.map(([key, val]) => transform(key, val))
				.flat()
		};
	} else {
		return {
			name: key,
			children: Array.from({ length: value }).map(() => {
				return { name: key };
			})
		};
	}
}
