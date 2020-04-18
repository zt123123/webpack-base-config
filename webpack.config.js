const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';

const plugins = [
  new webpack.ProgressPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name]_[chunkhash:5].css',
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  }),
  new HTMLWebpackPlugin({
    title: "Title",
    template: "index.html",
  }),
  new CleanWebpackPlugin(),
  new FriendlyErrorsWebpackPlugin(),
  new BundleAnalyzerPlugin({
    analyzerPort: 9999
  }),
  new CompressionPlugin()
];

isDev && plugins.push(
  // new webpack.HotModuleReplacementPlugin(),
);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'] //解析文件类型
  },
  entry: {
    index: "./src/index.jsx"
  },
  externals: {
    'react': 'React',
    'moment': 'moment',
    'react-dom': 'ReactDOM',
    'classnames': 'classNames',
    // "lodash": "_"
  },
  mode: isDev ? "development" : 'production',
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"]
      },
    ]
  },
  devServer: {
    contentBase: "./dist",
    // hot: isDev,
    open: true,
  },
  devtool: isDev ? "source-map" : 'none',
  optimization: {
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        "react-vendor": {
          test: (module) => (/react/.test(module.context) || /redux/.test(module.context)
            || /classnames/.test(module.context) || /prop-types/.test(module.context)),
          priority: 3,
          reuseExistingChunk: false
        },
        "antd-vendor": {
          test: (module) => (/antd/.test(module.context)),
          priority: 2,
          reuseExistingChunk: false
        },
      }
    }
  },
  plugins: plugins,
  output: {
    filename: "[name]_[contenthash:5].js",
    path: path.resolve(__dirname, "dist")
  },
  stats: "errors-only",
}