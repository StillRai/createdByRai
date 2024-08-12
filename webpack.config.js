const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/js/main.js',
    typeEffect: './src/js/typeEffect.js',
    theJourney: ['./src/js/initialize.js', './src/js/flowchart.js'],
    meetRai: ['./src/js/initialize.js'],
    weatherapp: './src/projects/weatherapp/weatherapp.js',
    'password-strength-analyser': './src/projects/password-strength-analyser/src/index.js',
    'interactive-storytelling': './src/projects/interactive-storytelling/src/index.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/images/[name][ext]',
        },
      },
      {
        test: /\.(mp3|wav)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/audio/[name][ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
      
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },
  optimization: {
    minimize: true, // Enables minification
    minimizer: [
      new TerserPlugin({
        parallel: true, // Use multi-process parallel running to improve build speed
        terserOptions: {
          ecma: 5, // Specify ECMAScript version
          compress: {}, // Options for compressing the code
          mangle: true, // Enable or disable variable name mangling
          output: {
            comments: false, // Remove comments from the output
            beautify: false, // Minified output
          },
        },
      }),
      
      
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main', 'typeEffect'],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/theJourney.html',
      filename: 'pages/theJourney.html',
      chunks: ['theJourney', 'main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/meetRai.html',
      filename: 'pages/meetRai.html',
      chunks: ['meetRai', 'main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/projects/weatherapp/index.html',
      filename: 'projects/weatherapp/index.html',
      chunks: ['weatherapp'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/projects/password-strength-analyser/public/index.html'),
      filename: 'projects/password-strength-analyser/index.html',
      chunks: ['password-strength-analyser'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/projects/interactive-storytelling/public/index.html'),
      filename: 'projects/interactive-storytelling/index.html',
      chunks: ['interactive-storytelling'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/404.html'),
      filename: '404.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/components', to: 'components' },
        { from: 'src/media', to: 'media' },
        { from: 'src/css', to: 'css' },
        { from: 'src/sections', to: 'sections' },
        {
          from: 'src/projects',
          to: 'projects',
          globOptions: {
            ignore: [
              '**/node_modules/**',
              '**/*.js',
              '**/*.css',
              '**/weatherapp/index.html',
              '**/password-strength-analyser/src/index.html',
              '**/interactive-storytelling/src/index.html',
              '**/interactive-storytelling/src/assets/audio/**',
            ],
          },
        },
        {
          from: 'src/projects/interactive-storytelling/src/assets/audio',
          to: 'assets/audio',
        },
      ],
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
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
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/404.html' }
      ]
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  performance: {
    maxAssetSize: 12288000,
    maxEntrypointSize: 12288000,
    hints: 'warning',
  },
  stats: {
    children: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
};
