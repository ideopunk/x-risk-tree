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

	const names = [name, parent];

	// for the survivals and for the root, direct to the ragnarok question series in general
	// if (name === 'survival' || n.depth === 0) ;

	if (names.includes('climate')) {
		if (names.includes('extinction')) {
			questionNumber = 1604;
		} else {
			questionNumber = 1500;
		}
	}

	if (names.includes('artificial intelligence')) {
		if (names.includes('extinction')) {
			questionNumber = 2513;
		} else {
			questionNumber = 1495;
		}
	}

	if (names.includes('nanotechnology')) {
		if (names.includes('extinction')) {
			questionNumber = 7795;
		} else {
			questionNumber = 1501;
		}
	}

	if (names.includes('nuclear war')) {
		if (names.includes('extinction')) {
			questionNumber = 1585;
		} else {
			questionNumber = 1494;
		}
	}

	if (names.includes('bioengineering')) {
		if (names.includes('extinction')) {
			questionNumber = 2514;
		} else {
			questionNumber = 1502;
		}
	}

	console.log(names)
	questionNumber = 1493
	// if (!questionNumber) {
	// 	throw new Error('could not assign question number to node ' + n);
	// }

	return 'https://www.metaculus.com/questions/' + questionNumber;
}
