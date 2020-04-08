const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    vendor: "./src/index.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: []
          }
        }
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
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