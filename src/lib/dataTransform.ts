export default function dataTransform(vals: {
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
}) {
	const transformed = {
		name: 'The Future',
		// children: [
		// 	...Array.from({ length: vals.climate }).map((_, i) => {
		// 		return { name: i < vals.climateX ? 'Climate Destruction' : 'Climate Catastrophe' };
		// 	}),
		// 	...Array.from({ length: vals.nano }).map((_, i) => {
		// 		return {
		// 			name: i < vals.nanoX ? 'Nanotechnology Destruction' : 'Nanotechnology Catastrophe'
		// 		};
		// 	}),
		// 	...Array.from({ length: vals.nuke }).map((_, i) => {
		// 		return { name: i < vals.nukeX ? 'Nuclear Destruction' : 'Nuclear Catastrophe' };
		// 	}),
		// 	...Array.from({ length: vals.ai }).map((_, i) => {
		// 		return {
		// 			name:
		// 				i < vals.aiX
		// 					? 'Artificial Intelligence Destruction'
		// 					: 'Artificial Intelligence Catastrophe'
		// 		};
		// 	}),
		// 	...Array.from({ length: vals.bio }).map((_, i) => {
		// 		return {
		// 			name: i < vals.bioX ? 'Bioengineering Destruction' : 'Bioengineering Catastrophe'
		// 		};
		// 	}),
		// 	...Array.from({ length: 100 - vals.total }).map(() => {
		// 		return { name: 'Human Survival' };
		// 	})
		// ]
		children: [
			{
				name: 'Climate',
				children: Array.from({ length: vals.climate }).map((_, i) => {
					return { name: i < vals.climateX ? 'Destruction' : 'Catastrophe' };
				})
			},
			{
				name: 'Nanotechnology',
				children: Array.from({ length: vals.nano }).map((_, i) => {
					return { name: i < vals.nanoX ? 'Destruction' : 'Catastrophe' };
				})
			},
			{
				name: 'Nuclear War',
				children: Array.from({ length: vals.nuke }).map((_, i) => {
					return { name: i < vals.nukeX ? 'Destruction' : 'Catastrophe' };
				})
			},
			{
				name: 'Artificial Intelligence',
				children: Array.from({ length: vals.ai }).map((_, i) => {
					return { name: i < vals.aiX ? 'Destruction' : 'Catastrophe' };
				})
			},
			{
				name: 'Bioengineering',
				children: Array.from({ length: vals.bio }).map((_, i) => {
					return { name: i < vals.bioX ? 'Destruction' : 'Catastrophe' };
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
