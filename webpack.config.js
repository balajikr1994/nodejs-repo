const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
	mode: "development",
	entry: {
		server: "./app.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	target: "node",
	devtool: "source-map",
	node: {
		// Need this when working with express, otherwise the build fails
		__dirname: false, // if you don't put this is, __dirname
		__filename: false // and __filename return blank or /
	},
	externals: [nodeExternals()], // Need this to avoid error when working with Express
	module: {
		rules: [
			{
				// Transpiles ES6-8 into ES5
				test: /\.js$/,
				exclude: ["/node_modules/"],
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"], //Preset used for env setup
						plugins: [["@babel/transform-runtime"]]
					}
				}
			},
			{
				// Loads the javacript into html template provided.
				// Entry point is set below in HtmlWebPackPlugin in Plugins
				test: /\.html$/,
				exclude: ["/node_modules/"],
				use: [{ loader: "html-loader" }]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ManifestPlugin(),
		new HtmlWebPackPlugin({
			template: "./index.html",
			filename: "./index.html"
		})
	]
};
