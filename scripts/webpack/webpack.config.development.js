const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');

config.plugins = config.plugins || [];

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
}));

config.plugins.push(new htmlWebpackPlugin({
  inject: 'body',
  template: './example/index.html',
  hash: false,
  cache: false,
  chunk: ['example']
}));

config.entry = { example: ['./example/index.js'] };

config.devServer = {
  compress: false,
  host: '0.0.0.0',
  disableHostCheck: true,
  port: '17079',
  overlay: {
    warnings: false,
    errors: true
  },
  publicPath: 'http://127.0.0.1:17079',
  historyApiFallback: {
    index: '/example.html'
  }
};

module.exports = config;
