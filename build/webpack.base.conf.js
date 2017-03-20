const path = require('path');

module.exports = {
	output: {
		path: path.join(__dirname, '../dist'),
		publicPath: '/',
		filename: '[name].js'
	},
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
				loader: 'babel-loader',
				include: [path.join(__dirname, '../src')]
			}
		]
	}
}
