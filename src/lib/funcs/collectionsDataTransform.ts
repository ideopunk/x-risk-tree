import type { TreeData } from '../types';

interface Outcome {}
interface GoodOutcome extends Outcome {
	survival?: number;
	flourishing?: number;
	extinction?: never;
	catastrophe?: never;
}
type BadOutcome = Outcome & { extinction?: number; catastrophe?: number; survival?: never };

type Outcomes = { name: string; probabilities: GoodOutcome | BadOutcome }[];

function outcomeTransform(outcome: { name: string; probabilities: GoodOutcome | BadOutcome }): {
	name: string;
	children: { name: string }[];
} {
	if ('survival' in outcome.probabilities) {
		return {
			name: outcome.name,
			children: Array.from({ length: outcome.probabilities.survival! }).map(() => {
				return { name: 'Survival' };
			})
		};
	}


	if ('flourishing' in outcome.probabilities) {
		return {
			name: outcome.name,
			children: Array.from({ length: outcome.probabilities.flourishing! }).map(() => {
				return { name: 'Flourishing' };
			})
		};
	}
	return {
		name: outcome.name,
		children: [
			...Array.from({ length: outcome?.probabilities?.catastrophe || 0 }).map(() => {
				return { name: 'Catastrophe' };
			}),
			...Array.from({ length: outcome?.probabilities?.extinction || 0 }).map(() => {
				return { name: 'Extinction' };
			})
		]
	};
}

export default function entryTransform(outcomes: Outcomes): TreeData {
	return { name: 'The Future', children: outcomes.map((o) => outcomeTransform(o)) };
}

// export default function collectionDataTransform(entries: Entry[]): TreeData {
// 	return {name: "The Future", }
// }
