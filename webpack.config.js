var path = require("path");

module.exports = {
    entry:  './src',
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(sass|scss)$/,
            loader: 'style-loader!css-loader!sass-loader'
        }]
    }
};