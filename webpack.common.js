const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

// root path for this project
const ROOT = __dirname;

module.exports = {
    entry: {
        main: "./src/index.tsx"
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js'],
        }),
        new HtmlWebpackPlugin({
            template: path.join(ROOT, 'public/index.html'),
        }),
        new SentryWebpackPlugin({
            // sentry-cli configuration
            authToken: "ec1a917b9ad24adb9839fc766bf07ad3801023507a734676859ff938f1a403d5",
            org: "spring-51",
            project: "spring-51",
            release: "my-project@1.0.0",

            // webpack specific configuration
            include: ".",

            ignore: ["node_modules", "webpack.common.js", "webpack.dev.js", "webpack.prod.js", "webpack.config.js", "babel.config.js", "server.js"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: 'file-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    },
};