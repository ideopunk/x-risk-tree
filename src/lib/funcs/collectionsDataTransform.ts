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
				return { name: 'survival' };
			})
		};
	}


	if ('flourishing' in outcome.probabilities) {
		return {
			name: outcome.name,
			children: Array.from({ length: outcome.probabilities.flourishing! }).map(() => {
				return { name: 'flourishing' };
			})
		};
	}
	return {
		name: outcome.name,
		children: [
			...Array.from({ length: outcome?.probabilities?.catastrophe || 0 }).map(() => {
				return { name: 'catastrophe' };
			}),
			...Array.from({ length: outcome?.probabilities?.extinction || 0 }).map(() => {
				return { name: 'extinction' };
			})
		]
	};
}

export default function entryTransform(outcomes: Outcomes): TreeData {
	return { name: 'the future', children: outcomes.map((o) => outcomeTransform(o)) };
}
