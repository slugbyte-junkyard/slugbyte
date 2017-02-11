'use strict';

require('dotenv').load();

const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtactText = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

let plugins = [
  new ExtactText('bundle.css'),
  new HTMLPlugin({template: `${__dirname}/src/index.html`}),
  new webpack.DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify('luwat bs uri'),
  }),
];

if(production){
  plugins = plugins.concat([
    new CleanPlugin(),
    new webpack.optimize.UglifyJSPlugin({
      minify: true,
      mangle: true,
    })
  ]);
}

module.exports = {
  plugins,
  devtool: 'eval',
  entry: `${__dirname}/src/entry.jsx`,
  output: {
    path: `${__dirname}/build`,
    filename: `[hash].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', 
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader', 
      },
      {
        test: /\.scss$/,
        loader: ExtactText.extract(['css-loader', 'sass-loader']), 
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.md$/,
        loader: 'html-loader', 
      },

    ],
  },
};