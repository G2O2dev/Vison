import {defineConfig} from "vite";

import {ViteMinifyPlugin} from "vite-plugin-minify";

import viteImagemin2 from "@vheemstra/vite-plugin-imagemin";
import viteImagemin from "vite-plugin-imagemin";
import imageminSvgo from "imagemin-svgo";
import imageminAvifenc from "@vheemstra/imagemin-avifenc";
import imageminMozjpeg from 'imagemin-mozjpeg'


export  default defineConfig({
    root: 'src',
    base: './',
    build: {
        inject: true,

        outDir: './dist',
        emptyOutDir: true,

        assetsInlineLimit: false,
        minify: 'esbuild',
        cssMinify: 'esbuild',
    },
    plugins: [
        // Inspect(),
        ViteMinifyPlugin({}),
        viteImagemin({
            plugins: {
                svg: imageminSvgo(),
            },
        }),
        viteImagemin2({
            exclude: [/node_modules/, /og.png/],

            plugins: {
                jpg: imageminMozjpeg(),
            },

            makeAvif: {
                formatFilePath: (file) => file,
                plugins: {
                    png: imageminAvifenc(),
                },
            },
        }),
    ]
});