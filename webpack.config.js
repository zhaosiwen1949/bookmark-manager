const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    devtool: "eval-source-map",
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root: __dirname,
        }),
        new CopyWebpackPlugin([ 
           {from: "./src/css/", to:"./css/"},
           {from: "./src/images/", to:"./images/"},
           {from: "./src/js/", to:"./js/"},
           {from: "./src/manifest.json", to:"./manifest.json"},
           {from: "./src/popup.html", to:"./popup.html"},
        ])
    ]
}