import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import Path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": Path.resolve(__dirname, "./src"),
        },
    },
    // server: {
    //     host: true,
    // },
});
