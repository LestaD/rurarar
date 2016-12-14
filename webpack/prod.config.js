const { resolve } = require('path')
const {
  HotModuleReplacementPlugin,
  DefinePlugin,
  optimize: { OccurrenceOrderPlugin, DedupePlugin, UglifyJsPlugin },
} = require('webpack')
const config = require('./base.config')
const { loaders } = require('./loaders')

module.exports = {
  target: 'web',
  context: config.context,
  entry: {
    main: [
      config.entry,
    ],
  },
  output: {
    path: config.outputPath + '/',
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders,
  },
  resolve: {
    root: resolve(__dirname, '..', 'src'),
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      __PRODUCTION__: true,
      __DEVELOPMENT__: false,
    }),
    new DedupePlugin(),
    new OccurrenceOrderPlugin(true),
    new UglifyJsPlugin({ compress: { warnings: false } }),
  ],
}
