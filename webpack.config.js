const webpack = require('webpack');
const path = require('path');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV,
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,

    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      // '/api/getCard': {
      //   target: 'http://localhost:3000/',
      //   secure: false,
      // },
    },
  },
  // headers: { 'Access-Control-Allow-Origin': '*' },
  plugins: [
    new MiniCssExtractplugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: false,
  },
};

// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   entry: './src/index.js',
//   mode: 'development',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel-loader',
//         options: { presets: ['@babel/env'] },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   resolve: { extensions: ['*', '.js', '.jsx'] },
//   output: {
//     path: path.resolve(__dirname, 'dist/'),
//     publicPath: '/dist/',
//     filename: 'bundle.js',
//   },
//   devServer: {
//     contentBase: path.join(__dirname, 'public/'),
//     port: 3000,
//     publicPath: 'http://localhost:3000/dist/',
//     hotOnly: true,
//   },
//   plugins: [new webpack.HotModuleReplacementPlugin()],
// };
