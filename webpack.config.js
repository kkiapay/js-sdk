

const path = require("path");
const webpack = require("webpack");
const webpack_rules = [];

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const babelLoader = {
    test: /\.js$/,
    // exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            "presets": [
                [
                    "@babel/preset-env", {
                //   "modules": "commonjs"
                }
            ],
              ],
        }
    }
};
webpack_rules.push(babelLoader);






module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        "app": "./index.js"
    },
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: true
        })],
      },
    output: {
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'kkiapay.bundle.js',
        library: 'kkiapay',
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
        rules: webpack_rules
    }
}