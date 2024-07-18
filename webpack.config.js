const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',  // Entry point for your JavaScript
    output: {
        filename: 'js/bundle.js',  // Output bundle file
        path: path.resolve(__dirname, 'dist'),  // Output directory
        clean: true, // Clean the output directory before emit
    },
    module: {
        rules: [
            {
                test: /\.css$/,  // Process CSS files
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.js$/,  // Process JavaScript files
                exclude: /node_modules/,  // Exclude node_modules
                use: {
                    loader: 'babel-loader',  // Use Babel loader
                    options: {
                        presets: ['@babel/preset-env'],  // Preset for modern JavaScript
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/output.css',  // Output CSS file
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',  // Template HTML file
            filename: 'index.html',  // Output HTML file
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/components', to: 'components' },  // Copy components to dist
                { from: 'src/sections', to: 'sections' },  // Copy sections to dist
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),  // Serve files from dist
        },
        watchFiles: {
            paths: ['src/**/*'],
            options: {
                usePolling: true,
            },
        },
        compress: true,  // Enable gzip compression
        port: 9000,  // Development server port
        hot: true,  // Enable hot module replacement
    },
};
