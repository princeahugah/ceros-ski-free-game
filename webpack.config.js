const path = require("path");
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
module.exports = {
    entry: "./js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    plugins: [new UnminifiedWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: "source-map"
};