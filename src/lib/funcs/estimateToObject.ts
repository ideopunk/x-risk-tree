export default function estimateToObject(
	estimate: { name: string; outcomes: { name: string; probability: number }[] } // these are formatted a little differently from how metaculus does it because most people don't give paired catastrophe/extinction estimates.
): {
	title: string;
	name: 'The Future';
	children: {
		name: string;
		children: {
			name: string;
		}[];
	}[];
} {
	return {
		title: estimate.name,
		name: 'The Future',
		children: estimate.outcomes.map((outcome) => {
			return {
				name: outcome.name,
				children: Array.from({ length: Math.round(outcome.probability) }).map((x) => {
					return {
						name:
							outcome.name === 'Survival' || outcome.name === 'Flourishing'
								? outcome.name
								: 'Extinction'
					};
				})
			};
		})
	};
}
