import type { TreeData } from '../types';

export default function metaculusDataTransform(vals: {
	total: number;
	climate: number;
	climateX: number;
	nano: number;
	nanoX: number;
	nuke: number;
	nukeX: number;
	ai: number;
	aiX: number;
	bio: number;
	bioX: number;
}): TreeData {
	const transformed = {
		name: 'The Future',
		children: [
			{
				name: 'Climate',
				children: Array.from({ length: vals.climate }).map((_, i) => {
					return { name: i < vals.climateX ? 'Extinction' : 'Catastrophe' };
				})
			},
			{
				name: 'Nanotechnology',
				children: Array.from({ length: vals.nano }).map((_, i) => {
					return { name: i < vals.nanoX ? 'Extinction' : 'Catastrophe' };
				})
			},
			{
				name: 'Nuclear War',
				children: Array.from({ length: vals.nuke }).map((_, i) => {
					return { name: i < vals.nukeX ? 'Extinction' : 'Catastrophe' };
				})
			},
			{
				name: 'Artificial Intelligence',
				children: Array.from({ length: vals.ai }).map((_, i) => {
					return { name: i < vals.aiX ? 'Extinction' : 'Catastrophe' };
				})
			},
			{
				name: 'Bioengineering',
				children: Array.from({ length: vals.bio }).map((_, i) => {
					return { name: i < vals.bioX ? 'Extinction' : 'Catastrophe' };
				})
			},
			{
				name: 'Survival',
				children: Array.from({ length: 100 - vals.total }).map(() => {
					return { name: 'Survival' };
				})
			}
		]
	};

	return transformed;
}
