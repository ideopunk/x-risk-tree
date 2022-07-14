export default function estimateToObject(
	estimate: { name: string; probability: number }[] // these are formatted a little differently from how metaculus does it because most people don't give paired catastrophe/extinction estimates.
): {
	name: string;
	children: {
		name: string;
		children: {
			name: string;
		}[];
	}[];
} {
	return {
		name: 'The Future',
		children: estimate.map((outcome) => {
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
