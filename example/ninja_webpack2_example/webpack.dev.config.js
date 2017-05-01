var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, './index.js')
  ],
  output: {
    path: '/',
    publicPath: 'http://localhost:3000/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style!css?sourceMap!sass?sourceMap&sourceComments'
    }],
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
