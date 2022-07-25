const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				green: { theme: '#5BC26A' },
				red: { theme: '#E8624A' },
				yellow: { theme: '#E9B44C' },
				blue: { theme: '#255C99' }
			}
		}
	},

	plugins: [
		require('@tailwindcss/typography')
		// ...
	]
};

module.exports = config;
