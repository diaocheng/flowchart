const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      'src': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, '../src')],
        options: {
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '../src')]
      }
    ]
  }
}
