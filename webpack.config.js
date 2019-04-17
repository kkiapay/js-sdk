var path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


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
        path: path.resolve(__dirname, 'dist'),
        filename: 'kkiapay.bundle.js',
        library: 'kkiapay'
    }
}