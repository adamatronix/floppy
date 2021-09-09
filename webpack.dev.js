const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   entry: {
    main: './src/index.ts',
    example: './src/Examples.tsx' 
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './lib'
  },    
});