const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = (env) => {
  console.log('goal', env.goal);
  console.log('production', env.production);
  return {
    entry: {
      // index: './src/index.ts', //ts配置
      index: './src/index.js',
      another: './src/another-bundle.js',
      // print: './src/print.js',
      // Vue 入口
      // main: './src/main.js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      open: true,
      hot: true,
    },
    optimization: {
      moduleIds: 'deterministic',
      // runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
      usedExports: true,
    },
    output: {
      // filename: '[name].[contenthash].js',
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, '../src'),
          exclude: path.resolve(__dirname, '../node_modules'),
          use: [
            { loader: 'style-loader', options: { esModule: false } },
            { loader: 'css-loader', options: { esModule: false } },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/i,
          type: 'asset/resource',
          exclude: /node_modules/,
          generator: {
            filename: 'static/[hash][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          exclude: /node_modules/,
          type: 'asset/resource',
          generator: {
            filename: 'static/[hash][ext][query]',
          },
        },
        {
          test: /\.m?js$/i,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: path.resolve(__dirname, '../src'),
          exclude: path.resolve(__dirname, '../node_modules'),
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '管理输出',
        filename: 'index.html',
        template: './index.html', //默认根目录是项目根目录，而不是当前文件的目录
      }),
      new VueLoaderPlugin(),
      new WebpackBundleAnalyzer({
        analyzerPort: 9999,
      }),
      new webpack.ProvidePlugin({
        join: ['lodash', 'join'],
      }),
    ],
  };
};
