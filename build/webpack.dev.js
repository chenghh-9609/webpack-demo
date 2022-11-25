const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    port: 5000,
    hot: true,
    open: true,
    proxy: {
      // 跨域代理转发
      '/apis': {
        target: 'https://localhost:80',
        changeOrigin: true,
        headers: {
          Cookie: '',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
    }),
  ],
});
console.log(process.env.NODE_ENV);
