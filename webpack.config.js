const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'postcss-loader'],
            }))
        }]
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.css"),
        new UglifyJSPlugin(),       /* Minifie le les fichiers JS en "dev" (error en dessous env.NODE_ENV='prod' */
        new OptimizeCSSAssets()     /* Minifie le les fichiers CSS en "dev" (error en dessous env.NODE_ENV='prod' */
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    },
    devtool: "eval-source-map"
}
  
module.exports = config;

/* TODO : à corriger important ! */

// if (process.env.NODE_ENV === 'production') {
//     module.exports.plugins.push(
//       new webpack.optimize.UglifyJsPlugin(),
//        new OptimizeCSSAssets()
//     );
// }