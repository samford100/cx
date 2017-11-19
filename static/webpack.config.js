const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: __dirname + '/js/index.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,  
				exclude: /node_modules/,  
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	}
}

module.exports = config