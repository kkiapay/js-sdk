

const path = require("path");
const webpack_rules = [];
const TerserPlugin = require('terser-webpack-plugin');

const babelLoader = {
    test: /\.js$/,
    use: {
        loader: "babel-loader",
        options: {
            "presets": [
                [
                    "@babel/preset-env"
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