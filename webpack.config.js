var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        "app": "./index.js"
    },
    plugins: [
        new UglifyJSPlugin({}, {
            sourceMap: true
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kkiapay.bundle.js',
        library: 'kkiapay'
    }
}