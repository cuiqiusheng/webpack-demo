var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map', // 生成Source-Maps

  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader?modules!postcss-loader" }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')
        ],
        devServer: {
          contentBase: "./public",  // 本地服务器所加载的页面所在的目录
          color: true,              // 终端中输出结果为彩色
          historyApiFallback: true, // 不跳转
          inline: true              // 实时刷新
        },
      }
    }),
    new webpack.BannerPlugin("Copyright 有姿态的北漂 inc."),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
}

