const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/js/main.js',
    weatherapp: './src/projects/weatherapp/weatherapp.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  cache: {
    type: 'filesystem', // 'memory' for development
    buildDependencies: {
      config: [__filename], // Cache invalidation on config change
    },
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
      filename: 'css/[name].css',  // Use [name] to generate unique filenames for each chunk
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Ensure the main index.html is included
      filename: 'index.html',  // Output filename
      chunks: ['main'],  // Specify the chunks to include
    }),
    new HtmlWebpackPlugin({
      template: './src/projects/weatherapp/index.html',
      filename: 'projects/weatherapp/index.html',
      chunks: ['weatherapp']
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
    historyApiFallback: true,  // Enable history API fallback to serve index.html for all routes
    devMiddleware: {
      writeToDisk: true, 
    },
  },
  performance: {
    maxAssetSize: 12288000,
    maxEntrypointSize: 12288000,
    hints: 'warning',
  },
  mode: 'development',
};
