const webpack = require('webpack')
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: [
		__dirname + '/js/index.js',
		'babel-polyfill'
	],
	module: {
	    loaders: [
	      {
	        test: /\.jsx?$/,
	        exclude: /(node_modules|bower_components)/,
	        loader: 'babel-loader',
	        query: {
	          presets: ['react', 'es2015', 'stage-0'],
	          plugins: ['transform-class-properties'],
	        }
	      },
	      { 
	        test: /\.css$/, 
	        loader: "style-loader!css-loader" 
	      },
	      {
	      	test: /\.(png|jpg|gif)$/,
	      	loader: 'file-loader',
	      	options: {
	      		publicPath: "/dist",
	      		outputPath: "/"
	      	}
	      }
	    ]

	  },
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.css', '.png']
	}
}

module.exports = config