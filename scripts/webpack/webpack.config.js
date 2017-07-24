const webpack = require('webpack');

const babelOptions = {
  'presets': [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0'),
    [require.resolve('babel-preset-env'), {
      targets: {
        browsers: ['> 1%', 'iOS >= 7', 'Android >= 4', 'not ie <= 8']
      }
    }]
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-runtime')
  ]
};

module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: require('path').join(__dirname, '../../dist'),
    library: 'store-decorator',
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('babel-loader'),
          options: babelOptions
        }]
      }
    ]
  },
  devtool: '#source-map',
  target: 'web'
};
