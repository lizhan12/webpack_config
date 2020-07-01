const cssnano = require('cssnano')
const path = require('path')
const glob = require('glob-all')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 分析打包使用的时间
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// 引入资源
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const PurgecssPlugin = require('purgecss-webpack-plugin')
// 并行压缩
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.base')
const webpack = require('webpack')
// const smp = new SpeedMeasureWebpackPlugin()
const cwd = process.cwd()
const PATHS = {
  src: path.join(cwd, './src'),
}

const prodConfig = {
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
      manifest: path.resolve(cwd, './dll/libraryA.json'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(cwd, './dll/library.json'),
    }),

    new addAssetHtmlWebpackPlugin({
      filepath: path.resolve(cwd, './dll/*.dll.js'),
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
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
    minimize: true,
    minimizer: [new TerserPlugin({parallel: 4})],
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

module.exports = merge(baseConfig, prodConfig)
