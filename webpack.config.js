const path = require("node:path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");



const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        open: true,
        hot: true,
    },
    entry: [path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: "[name].js",
        assetModuleFilename: 'assets/[name][ext]',
        publicPath: '',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: "index.html",
            inject: 'body',
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            as: 'font',
            include: 'allAssets',
            fileWhitelist: [/\.fast\.woff2/i],

        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'img'), to: path.resolve(__dirname, 'dist', 'img') },
            ],
        }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new JsonMinimizerPlugin(),
            new TerserPlugin(),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [require("postcss-preset-env")]
                    //         }
                    //     }
                    // },
                    "sass-loader"
                ],
            },
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name][ext]',
                },
            },
            {
                test: /\.svg$/i,
                use: devMode ? [] : ['image-webpack-loader'],
                type: 'asset/resource',
            },
        ]
    }
}