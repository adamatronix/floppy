const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
   mode: 'production',
   entry: {
    index: './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib')
  },
   optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});