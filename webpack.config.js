var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app/main',
  output: {
    path: path.join(__dirname, '/app'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './app',
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: [
   new webpack.optimize.OccurenceOrderPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoErrorsPlugin()
 ]
}
