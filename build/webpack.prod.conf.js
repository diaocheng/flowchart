const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = webpackMerge(baseWebpackConfig, {
  entry: {
    flowchart: './src/flowchart.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'flowchart'
  },
  externals: {
    d3: 'd3'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
});
