const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'] //解析文件类型
  },
  entry: {
    index: "./src/index.jsx"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [[
              "@babel/preset-env",
              {
                "targets": {
                  "esmodules": true
                }
              }
            ], "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime",
            ]
          }
        }
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
    ]
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    open: true,
  },
  devtool: "source-map",
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial"
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: "Title",
      template: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
}