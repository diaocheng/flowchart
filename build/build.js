const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('Building for production...');
spinner.start();

shell.rm('-rf', path.join(__dirname, '../dist'));
shell.mkdir('-p', path.join(__dirname, '../dist'));

webpack(webpackConfig, function (error, stats) {
  spinner.stop();
  if (error) {
    throw error;
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');
  console.log(chalk.cyan('Build complete\n'));
});
