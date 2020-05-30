const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'quartzite.js',
    library: 'quartzite',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'examples'),
      path.join(__dirname, 'dist')
    ],
    compress: true,
    port: 8080
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
