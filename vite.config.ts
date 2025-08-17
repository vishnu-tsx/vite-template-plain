import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [reactRouter(), tailwindcss(), tsconfigPaths()],

	preview: {
		port: 3000,
	},

	server: {
		port: 3000,
	},
});
