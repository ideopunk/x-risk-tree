import { METACULUS_KEY } from '$env/static/private';

async function metaculusFetch(question: number): Promise<number> {
	if (process.env.NODE_ENV === 'production') {
		console.log('fetching metaculus');

		const res = await fetch(`https://www.metaculus.com/api2/questions/${question}`, {
			headers: { Authorization: `Token ${METACULUS_KEY}` }
		});
		const bod = await res.json();

		const latestAVG = bod.question.aggregations.recency_weighted.latest.centers[0];

		return latestAVG;
	} else {
		return 0.3;
	}
}

function normalise(sum: number, total: number, particular: number, xRisk: number) {
	const realParticular = (particular * total) / sum;
	const realXRisk = realParticular * xRisk;

	const roundedParticular = Math.round(realParticular * 100);
	const roundedXRisk = Math.round(realXRisk * 100);
	return [roundedParticular, roundedXRisk];
}

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<any> {
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

	const sum = climateAvg + nanoAvg + nukeAvg + aiAvg + bioAvg;

	// CALCULATE THE PORTIONS
	const [climate, climateX] = normalise(sum, totalAvg, climateAvg, climateXAvg);
	const [nano, nanoX] = normalise(sum, totalAvg, nanoAvg, nanoXAvg);
	const [nuke, nukeX] = normalise(sum, totalAvg, nukeAvg, nukeXAvg);
	const [ai, aiX] = normalise(sum, totalAvg, aiAvg, aiXAvg);
	const [bio, bioX] = normalise(sum, totalAvg, bioAvg, bioXAvg);
	const total = Math.round(totalAvg * 100);

	let vals = { total, climate, climateX, nano, nanoX, nuke, nukeX, ai, aiX, bio, bioX };

	return {
		props: {
			vals,
			time: new Date().toString(),
			test: 'fake'
		}
	};
}
