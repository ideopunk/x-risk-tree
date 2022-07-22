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
	if (name === 'survival' || name === "sustenance" || n.depth === 0) questionNumber = 1493;

	if (parent === 'climate' || name === 'climate') {
		if (name === 'extinction') {
			questionNumber = 1604;
		} else {
			questionNumber = 1500;
		}
	}

	if (parent === 'artificial intelligence' || name === 'artificial intelligence') {
		if (name === 'extinction') {
			questionNumber = 2513;
		} else {
			questionNumber = 1495;
		}
	}

	if (parent === 'nanotechnology' || name === 'nanotechnology') {
		if (name === 'extinction') {
			questionNumber = 7795;
		} else {
			questionNumber = 1501;
		}
	}

	if (parent === 'nuclear war' || name === 'nuclear war') {
		if (name === 'extinction') {
			questionNumber = 1585;
		} else {
			questionNumber = 1494;
		}
	}

	if (parent === 'bioengineering' || name === 'bioengineering') {
		if (name === 'extinction') {
			questionNumber = 2514;
		} else {
			questionNumber = 1502;
		}
	}

	if (!questionNumber) {
		throw new Error('could not assign question number to node ' + n.data.name);
	}

	return 'https://www.metaculus.com/questions/' + questionNumber;
}
