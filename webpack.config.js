
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	entry: './src/GuestBook.jsx',

	output: {
		path: './dist',
		filename: "bundle.js"
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],

	module: {
		loaders: [
			{
				test: [/\.jsx$/],
				exclude: [ /node_modules/, /bower_components/ ],
				loader: 'babel',
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			},
		]
	},

	devServer: {
		inline: true,
		hot: true,
		port:8888,
		contentBase: './'
	}

}
