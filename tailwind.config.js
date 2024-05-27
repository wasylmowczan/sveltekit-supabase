/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				padding: "1rem",
				center: true
			}
		}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')]
};
