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
		name: '2024',
		children: [
			{
				name: 'climate',
				children: Array.from({ length: vals.climate }).map((_, i) => {
					return { name: i < vals.climateX ? 'extinction' : 'catastrophe' };
				})
			},
			{
				name: 'nanotechnology',
				children: Array.from({ length: vals.nano }).map((_, i) => {
					return { name: i < vals.nanoX ? 'extinction' : 'catastrophe' };
				})
			},
			{
				name: 'nuclear war',
				children: Array.from({ length: vals.nuke }).map((_, i) => {
					return { name: i < vals.nukeX ? 'extinction' : 'catastrophe' };
				})
			},
			{
				name: 'artificial intelligence',
				children: Array.from({ length: vals.ai }).map((_, i) => {
					return { name: i < vals.aiX ? 'extinction' : 'catastrophe' };
				})
			},
			{
				name: 'bioengineering',
				children: Array.from({ length: vals.bio }).map((_, i) => {
					return { name: i < vals.bioX ? 'extinction' : 'catastrophe' };
				})
			},
			{
				name: 'sustenance',
				children: Array.from({ length: 100 - vals.total }).map(() => {
					return { name: 'survival' };
				})
			}
		]
	};

	return transformed;
}