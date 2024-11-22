const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;

module.exports = (env, options) => {
  const { mode } = options;

  return {
    mode,
    performance: {
      hints: false,
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: port,
      open: true,
      hot: true,
      historyApiFallback: true,
      compress: true,
      watchFiles: ['src/**/*'],
    },
    entry: './src/index',
    stats: 'errors-only',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.wasm$/,
          loader: 'base64-loader',
          type: 'javascript/auto',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: "./public/favicon.ico"
      }),
      new MiniCssExtractPlugin(),
      new NodePolyfillPlugin(),
      new Dotenv({ systemvars: true }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx'],
      }),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        views: path.resolve(__dirname, 'src/views/'),
        actions: path.resolve(__dirname, 'src/redux/actions/'),
        components: path.resolve(__dirname, 'src/components/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        assets: path.resolve(__dirname, 'src/assets/'),
        process: "process/browser"
      },
      fallback: {
        path: false,
        fs: false,
        Buffer: false,
        process: false,
      },
    },
  };
};
