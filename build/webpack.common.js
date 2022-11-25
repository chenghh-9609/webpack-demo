const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
module.exports = {
  entry: {
    index: './src/index.js',
    // Vue 入口
    // main: './src/main.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: path.resolve(__dirname, '../loader/a.js'),
            options: {
              a: 'test a',
            },
          },
          { loader: 'style-loader' },
          {
            loader: path.resolve(__dirname, '../loader/b.js'),
            options: {
              b: 'test b',
            },
          },
          {
            loader: 'css-loader',
            options: { esModule: false },
          },
          {
            loader: path.resolve(__dirname, '../loader/c.js'),
            options: {
              c: 'test c',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',
        //生成的输出文件配置
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack demo',
      filename: 'index.html',
      template: './index.html', //默认根目录是项目根目录，而不是当前文件的目录
    }),
    // 用于一些第三方库可能引用的全局依赖，
    // 比如a库和b库都用了jQuery中的$，
    // 这时可以将$变量提取出来声明为全局变量
    new webpack.ProvidePlugin({
      // _ : 'lodash',
      join: ['lodash', 'join'], // 将join作为全局函数，所有模块都能不引用就可使用
    }),
    new VueLoaderPlugin(),
    new WebpackBundleAnalyzer({
      analyzerPort: 9999
    }),
  ],
};
