const webpack = require('webpack');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const config = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
  },
  optimization: {
    moduleIds: 'deterministic',
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
      maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
      automaticNameDelimiter: '~', // 命名分隔符
      cacheGroups: {
        // 缓存组，会继承和覆盖splitChunks的配置
        default: {
          // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
          priority: -10,
        },
      },
    },
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i, //匹配需要压缩的文件类型
        include: /\/src/, //匹配参与压缩的文件
        parallel: true, // 多进程并发运行以提高构建速度，强烈建议添加此配置
        minify: TerserPlugin.uglifyJsMinify, // 类型为function，可自定义压缩函数，此处使用ugligy-js压缩
        extractComments: false, // 删除注释
        terserOptions: {
          compress: true,
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin({
        test: /\.css$/,
        include: /\/src/,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { esModule: false } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: true,
    }),
  ],
});
module.exports = config;
