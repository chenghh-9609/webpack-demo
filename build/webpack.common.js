const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBuildNotifier = require('webpack-build-notifier');
module.exports = {
  entry: {
    // index: './src/index.js',
    // Vue 入口
    main: './src/main.js',
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
        test: /\.(sa|sc|c)ss$/i,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            options: { esModule: false },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
        //生成的输出文件配置
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
      {
        test: /\.js$/i,
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
  resolve: {
    extensions: ['.js', '.ts', '.json'], // 频率高的出现再最前面，列表尽可能的小，书写导入语句时，尽量写上后缀名
    modules: [path.resolve(__dirname, '../node_modules')],
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
      _: 'lodash',
      join: ['lodash', 'join'], // 将join作为全局函数，所有模块都能不引用就可使用
    }),
    new VueLoaderPlugin(),
    // new WebpackBundleAnalyzer({
    //   analyzerPort: 9999,
    //   statsFilename: 'stats.json',
    // }),
    // new SpeedMeasurePlugin(),
    // new ProgressBarPlugin(),
    // new WebpackBuildNotifier({
    //   title: 'webpack-demo',
    //   supressSuccess: true,
    // }),
  ],
};
