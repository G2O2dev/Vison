import {ViteMinifyPlugin} from "vite-plugin-minify";
import {ViteImageOptimizer} from "vite-plugin-image-optimizer";

export  default {
    root: 'src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,

        assetsInlineLimit: false,
        minify: 'esbuild',
        cssMinify: 'esbuild',
    },
    css: {

    },
    plugins: [
        // Inspect(),
        ViteMinifyPlugin({}),
        ViteImageOptimizer({}),
    ]
}