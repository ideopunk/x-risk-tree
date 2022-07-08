const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				green: {
					forest: '#218721'
				}
			}
		}
	},

	plugins: [
		require('@tailwindcss/typography')
		// ...
	]
};

module.exports = config;
