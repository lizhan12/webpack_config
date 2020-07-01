const cssnano = require('cssnano')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 分析打包使用的时间
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const smp = new SpeedMeasureWebpackPlugin()


const prodConfig = {
  // entry: path.resolve(__dirname, '../src/home/index.js'),
  // output: {
  //   path: path.resolve(__dirname, '../dist'),
  //   filename: '[name]_[hash:8].js'
  // },
  mode: 'production',
  plugins: [
    // 分析资源体积
    new BundleAnalyzer(),
    // 压缩css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, '../dll/libraryA.json'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, '../dll/library.json'),
    }),
  
    // new HtmlWebpackPlugin({
    //   inlineSource: '.css$',
    //   template: path.join(__dirname, `../src/home/index.html`),
    //   filename: `index.html`,
    //   chunks: ['vendors', 'main'],
    //   inject: true,
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: false,
    //   },
    // }),
    new addAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/*.dll.js'),
    }),

    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
}
const config = merge(baseConfig, prodConfig)
console.log(config.plugins)
module.exports = config
