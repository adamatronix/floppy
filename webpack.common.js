const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.ts',
    example: './src/Examples.tsx' 
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    rules: [  
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }, 
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
          test: /\.scss$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          test: /\.(obj|fbx|glb|gltf)$/,
          loader: 'url-loader'
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Examples',
      templateContent: ({htmlWebpackPlugin}) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>${htmlWebpackPlugin.options.title}</title>
          </head>
          <body style="margin: 0; padding: 0; width: 100%; height: 100vh;">
            <div id="root"></div>
          </body>
        </html>
      `
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}