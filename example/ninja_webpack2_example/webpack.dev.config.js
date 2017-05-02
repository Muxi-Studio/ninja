var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, './index.js')
    ],
    output: {
        path: '/',
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.scss'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};
