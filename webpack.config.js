const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')
// const UglifyESPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // 入口
  entry: {
    webPlayer: [
      path.resolve(__dirname, './src/index.js'),
    ],
  },
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: __dirname,
    open: true,
    port: 5001,
    hot: true,
    // https: true,
  },
  devtool: 'cheap-module-eval-source-map', // 'inline-source-map',
  // 'cheap-module-eval-source-map',
  // 'eval-source-map',
  // 'source-map',
  // devtool: 'eval-source-map',
  // autoOpenBrowser: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.html$/,
      //   use: ['raw-loader']
      // },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: ['url-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)$/,
        use: {
          loader: 'url-loader',
          // options: {
          //   limit: 50000,
          // },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // devtool要注释掉！！！
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webplayer',
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'head',
    }),
  ],
}
