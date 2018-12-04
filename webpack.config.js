const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'relative-date.js',
        library: 'relativeDate',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    devServer: {
        contentBase: [
            path.join(__dirname, 'examples'),
            path.join(__dirname, 'dist')
        ],
        compress: true,
        port: 9000
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
