/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./script.js"],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		"h-[500px]",
		"md:w-full",
		"md:w-20",
		"md:hover:w-28",
		"justify-start",
		"justify-center",
		"text-2xl",
		"text-xl",
		"mb-2",
		"md:-rotate-90",
		"py-8",
	],
};
