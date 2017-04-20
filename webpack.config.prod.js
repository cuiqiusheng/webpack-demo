var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // devtool: 'eval-source-map', // 生成Source-Maps

  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "[name]-[hash].js"
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules!postcss-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')
        ]
      }
    }),
    new webpack.BannerPlugin("Copyright 有姿态的北漂 inc."),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ],
}

