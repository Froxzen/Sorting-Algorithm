import { defineConfig } from 'vite';

export default defineConfig({
	root: ".",
	base: "/Sorting-Algorithm/",
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: "dist",
		sourcemap: true,
	},
});