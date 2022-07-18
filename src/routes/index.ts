import metaculusDataTransform from '$lib/funcs/metaculusDataTransform';
import metaculusLinker from '$lib/funcs/metaculusLinker';
import treeify from '$lib/funcs/treeify';
import type { RequestHandlerOutput } from '@sveltejs/kit';

async function metaculusFetch(question: number): Promise<number> {
	if (process.env.NODE_ENV === 'production') {
		const res = await fetch(`https://www.metaculus.com/api2/questions/${question}`);

		const bod = await res.json();
		const avg = bod.prediction_timeseries[bod.prediction_timeseries.length - 1].distribution.avg;
		return avg;
	} else {
		return 0.3;
	}
}

function makeRelative(total: number, particular: number, xRisk: number) {
	const realParticular = total * particular;
	const realXRisk = realParticular * xRisk;

	const roundedParticular = Math.round(realParticular * 100);
	const roundedXRisk = Math.round(realXRisk * 100);
	return { catastrophe: roundedParticular, extinction: roundedXRisk };
}

export async function get(): Promise<RequestHandlerOutput> {
	// GET THE DATA
	// By 2100 will the human population decrease by at least 10% during any period of 5 years?
	const totalQuestion = metaculusFetch(1493);

	// Will such a catastrophe be due to either human-made climate change or geoengineering?
	const climateQuestion = metaculusFetch(1500);

	// If a global climate disaster occurs by 2100, will the human population decline by 95% or more?
	const climateXQuestion = metaculusFetch(1604);

	// Will such a catastrophe be due to a nanotechnology failure-mode?
	const nanoQuestion = metaculusFetch(1501);

	// If a global nanotechnology catastrophe occurs by 2100, will the human population decline by 95% or more?
	const nanoXQuestion = metaculusFetch(7795);

	// Will such a catastrophe be due to nuclear war?
	const nukeQuestion = metaculusFetch(1494);

	// If a nuclear catastrophe occurs, will it reduce the human population by 95% or more?
	const nukeXQuestion = metaculusFetch(1585);

	// Will such a catastrophe be due to an artificial intelligence failure-mode?
	const aiQuestion = metaculusFetch(1495);

	// If an artificial intelligence catastrophe occurs, will it reduce the human population by 95% or more?
	const aiXQuestion = metaculusFetch(2513);

	// Will such a catastrophe be due to biotechnology or bioengineered organisms?
	const bioQuestion = metaculusFetch(1502);

	// If a global biological catastrophe occurs, will it reduce the human population by 95% or more?
	const bioXQuestion = metaculusFetch(2514);

	const [
		totalAvg,
		climateAvg,
		climateXAvg,
		nanoAvg,
		nanoXAvg,
		nukeAvg,
		nukeXAvg,
		aiAvg,
		aiXAvg,
		bioAvg,
		bioXAvg
	] = await Promise.all([
		totalQuestion,
		climateQuestion,
		climateXQuestion,
		nanoQuestion,
		nanoXQuestion,
		nukeQuestion,
		nukeXQuestion,
		aiQuestion,
		aiXQuestion,
		bioQuestion,
		bioXQuestion
	]);

	let data = {};

	// CALCULATE THE PORTIONS
	data['climate'] = makeRelative(totalAvg, climateAvg, climateXAvg);
	data['nanotechnology'] = makeRelative(totalAvg, nanoAvg, nanoXAvg);
	data['nuclear war'] = makeRelative(totalAvg, nukeAvg, nukeXAvg);
	data['artificial intelligence'] = makeRelative(totalAvg, aiAvg, aiXAvg);
	data['bioengineering'] = makeRelative(totalAvg, bioAvg, bioXAvg);
	data['total'] = Math.round(totalAvg * 100);

	// BUILD THE TREE
	let input = metaculusDataTransform(data);
	const chart = treeify(input, {
		label: (d) => d.name,
		title: (d, n) => d.name,
		link: (d, n) => metaculusLinker(n),
		width: 652,
		height: 652,
		margin: 50
	});

	console.log('BUILD COMPLETE'); // make sure this only logs during build, not runtime.
	return {
		status: 200,
		body: {
			chart: JSON.stringify(chart),
			time: new Date().toString()
		}
	};
}
