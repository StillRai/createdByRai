const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/images/[name][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/output.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/projects/weatherapp/index.html',
      filename: 'projects/weatherapp/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/components', to: 'components' },
        { from: 'src/media', to: 'media' },
        { from: 'src/css', to: 'css' },
        { from: 'src/sections', to: 'sections' },
        { from: 'src/projects', to: 'projects', globOptions: { ignore: ['**/weatherapp/index.html'] } },
      ],
    }),
    new Dotenv(), // Add Dotenv plugin
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['src/**/*'],
    compress: true,
    port: 9000,
    hot: true,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  performance: {
    maxAssetSize: 12288000,
    maxEntrypointSize: 12288000,
    hints: 'warning',
  },
  mode: 'development',
};
