const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const cwd = process.cwd()


module.exports = {
  // context: path.resolve(__dirname,'../'),
  entry: {
    library: ['react'],
    libraryA: ['react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(cwd, './dll'),
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HardSourceWebpackPlugin(),
    new webpack.DllPlugin({
      
      context: __dirname,
      name: '[name]',
      path: path.resolve(cwd, './dll/[name].json'),
    }),
  ],
  mode: 'production',
}
