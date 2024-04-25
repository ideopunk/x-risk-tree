import type { TreeData } from '../types';

interface Outcome {}
interface GoodOutcome extends Outcome {
	survival?: number;
	sustenance?: number;
	flourishing?: number;
	extinction?: never;
	catastrophe?: never;
}
type BadOutcome = Outcome & { extinction?: number; catastrophe?: number; survival?: never };

type Outcomes = { name: string; probabilities: GoodOutcome | BadOutcome }[];

import { goodOutcomes } from '../funcs/treeUtilities';
function outcomeTransform(outcome: { name: string; probabilities: GoodOutcome | BadOutcome }): {
	name: string;
	children: { name: string }[];
} {
	const goodKey = Object.keys(outcome.probabilities).find((k: any) => goodOutcomes.includes(k));
	if (goodKey) {
		return {
			name: outcome.name,
			children: Array.from({ length: outcome.probabilities[goodKey]! }).map(() => {
				return { name: goodKey };
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
	return { name: '2024', children: outcomes.map((o) => outcomeTransform(o)) };
}