const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.conf');

const port = 8080;
const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
});

const hotMiddleware = webpackHotMiddleware(compiler, {
	log: () => { }
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' });
		cb();
	});
});

app.use(devMiddleware);
app.use(hotMiddleware);

var uri = `http://127.0.0.1:${port}`;
devMiddleware.waitUntilValid(function () {
	console.log(`> Listening at ${uri}\n`);
});

module.exports = app.listen(port, function (error) {
	if (error) {
		console.log(error);
		return;
	}
	opn(uri);
});
