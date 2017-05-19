var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// List of dependencies that are less frequently updated
const VENDOR_LIBS = [
    'faker', 'lodash', 'redux', 'react-redux', 'react-dom', 'react-input-range', 'redux-form', 'redux-thunk', 'react'
];

module.exports = {
    entry: {
        bundle: './src/index.js', // application JS files 
        vendor: VENDOR_LIBS // depencencies JS files
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js' // hash the content and put it out as a hash name to avoid caching issues
    },
    module: {
        rules: [{
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/ // Do not include any file from node_modules since they are already in ES5 format.
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [
        // avoid duplicating dependencies in both bundle and vendor js
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};