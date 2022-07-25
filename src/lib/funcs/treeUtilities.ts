export enum Color {
	Red = '#E8624A',
	Green = '#5BC26A',
	Yellow = '#E9B44C',
	Blue = '#255C99'
}

export const goodOutcomes = ['survival', 'flourishing', 'sustenance'] as const;
export const badOutcomes = ['extinction', 'catastrophe'] as const;

type Data = { name: string };

export function familyNames(
	d:
		| {
				data: Data;
				parent: { data: Data; parent?: { data: Data } };
				children: { data: Data }[];
		  }
		| {
				source: { data: Data; parent?: { data: Data } };
				target: { data: Data; height: number; children?: { data: Data }[] };
		  }
): string[] {
	if ('data' in d) {
		// root
		if (!d.parent) return ['the future'];

		let names = [d.data.name];
		names.push(d.parent.data.name);

		if (d?.parent?.parent) {
			names.push(d.parent.parent.data.name);
		}

		if (d.children) {
			names.push(...d.children.map((c) => c.data.name));
		}

		return names;
	} else {
		let names = [d.source.data.name, d.target.data.name];

		// this is an inner leaf
		if (d.target.children) {
			// if all the child leaves are extinction, then this inner path should be colored for extinction
			names.push(...d.target.children.map((c) => c.data.name));
		}

		return names;
	}
}

export function colorizer(...names: string[]) {
	// root
	if (names.length === 1 && names[0] === 'the future') return Color.Green;

	if (names.includes('extinction')) return Color.Red;

	if (names.includes('flourishing')) return Color.Blue;

	if (names.some((n: any) => goodOutcomes.includes(n))) return Color.Green;

	return Color.Yellow;
}