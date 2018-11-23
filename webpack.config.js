var path = require('path');

module.exports = {
  entry: './lib/relative-date.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'relative-date.js'
  },
  devServer: {
    contentBase: './sample',
    hot: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
