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
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
    
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/images/[name][ext]'
        }
      },
      {
        test: /\.(mp3|wav)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/audio/[name][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime']
            },
          }
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
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
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/projects/weatherapp/index.html',
      filename: 'projects/weatherapp/index.html',
      chunks: ['weatherapp']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/projects/password-strength-analyser/public/index.html'),
      filename: 'projects/password-strength-analyser/index.html',
      chunks: ['password-strength-analyser']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/projects/interactive-storytelling/public/index.html'),
      filename: 'projects/interactive-storytelling/index.html',
      chunks: ['interactive-storytelling']
    }),
    new HtmlWebpackPlugin({
      template: './src/sections/skills.html',
      filename: 'sections/skills.html',
      chunks: ['typeEffect']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/components', to: 'components' },
        { from: 'src/media', to: 'media' },
        { from: 'src/css', to: 'css' },
        { from: 'src/sections', to: 'sections', globOptions: { ignore: ['**/skills.html'] } },
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
              '**/interactive-storytelling/src/assets/audio/**'
            ]
          }
        },
        {
          from: 'src/projects/interactive-storytelling/src/assets/audio',
          to: 'assets/audio'
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
    historyApiFallback: true,
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
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
};
