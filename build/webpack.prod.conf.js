const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const package = require('../package');
const banner = require('./banner');

module.exports = webpackMerge(baseWebpackConfig, {
  entry: {
    flowchart: './src/flowchart.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'flowchart',
    umdNamedDefine: true
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        VERSION: `"${package.version}"`
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.BannerPlugin({
      // the banner as string, it will be wrapped in a comment
      banner: banner(package),
      // if true, banner will not be wrapped in a comment
      raw: false,
      // if true, the banner will only be added to the entry chunks
      entryOnly: true,
    })
  ]
});
