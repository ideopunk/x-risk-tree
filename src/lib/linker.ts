type Node = {
	data: { name: string };
	depth: number;
	height: number;
	x: number;
	y: number;
	parent?: Node;
	children: Node[];
};

export default function linker(n: Node): string {
	let questionNumber = 0;
	let name = n.data.name;
	let parent = n.parent?.data.name;

	// for the survivals and for the root, direct to the ragnarok question series in general
	if (name === 'Survival' || n.depth === 0) questionNumber = 1493;

	if (parent === 'Climate' || name === 'Climate') {
		if (name === 'Destruction') {
			questionNumber = 1604;
		} else {
			questionNumber = 1500;
		}
	}

	if (parent === 'Artificial Intelligence' || name === 'Artificial Intelligence') {
		if (name === 'Destruction') {
			questionNumber = 2513;
		} else {
			questionNumber = 1495;
		}
	}

	if (parent === 'Nanotechnology' || name === 'Nanotechnology') {
		if (name === 'Destruction') {
			questionNumber = 7795;
		} else {
			questionNumber = 1501;
		}
	}

	if (parent === 'Nuclear War' || name === 'Nuclear War') {
		if (name === 'Destruction') {
			questionNumber = 1585;
		} else {
			questionNumber = 1494;
		}
	}

	if (parent === 'Bioengineering' || name === 'Bioengineering') {
		if (name === 'Destruction') {
			questionNumber = 2514;
		} else {
			questionNumber = 1502;
		}
	}

	if (!questionNumber) {
		throw new Error('could not assign question number to node ' + n);
	}

	return 'https://www.metaculus.com/questions/' + questionNumber;
}
