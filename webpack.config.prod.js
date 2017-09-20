var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

var targetPath = path.resolve(__dirname, 'target/');

module.exports = [
	{
		context: __dirname + '',
		entry: {
			vendor: './src/vendor.ts',
			index: './src/index.ts'
		},
		output: {
			path: targetPath,
			filename: '[name].js'
		},
		resolve: {
			extensions: ['.ts', '.js', '.css', '.scss', '.html']
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: [
						{loader: 'strip-loader', options: {strip: ['debug', 'console.debug', 'console.log']}},
						{loader: 'ng-annotate-loader', options: {ngAnnotate: 'ng-annotate-patched', es6: true, explicitOnly: false}},
						{loader: 'ts-loader'}
					]
				},
				{
					test: /\.js$/,
					use: [
						{loader: 'strip-loader', options: {strip: ['debug', 'console.debug', 'console.log']}},
						{loader: 'ng-annotate-loader', options: {ngAnnotate: 'ng-annotate-patched', es6: true, explicitOnly: false}}
					]
				},
				{
					test: /\.html$/,
					use: [
						{loader: 'raw-loader'}
					]
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: ExtractTextPlugin.extract({
						use: 'css-loader?-minimize&sourceMap!sass-loader?sourceMap',
						fallback: 'style-loader'
					})
				},
				{
					test: /\.png$/,
					use: [
						{loader: 'url-loader', options: {limit: 16384, mimetype: 'image/png'}}
					]
				},
				{
					test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{loader: 'url-loader', options: {limit: 16384, mimetype: 'image/svg+xml'}}
					]
				},
				{
					test: /(fontawesome).*\.(eot|otf|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/i,
					use: [
						{loader: 'file-loader', options: {name: './fonts/font-awesome/[name].[ext]', publicPath: './../'}}
					]
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				'$': 'jquery',
				'jQuery': 'jquery',
				'window.jQuery': 'jquery',
				'Popper': ['popper.js', 'default'],
				'Util': 'exports-loader?Util!bootstrap/js/dist/util',
				'Dropdown': 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vendor']
			}),
			new webpack.DefinePlugin({
				'ENV': JSON.stringify('development')
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
				output: {
					comments: false
				},
				sourceMap: false
			}),
			new ExtractTextPlugin('./index.css'),
			new HtmlWebpackPlugin({
				template: './src/index.html.ejs',
				inject: false,
				filename: 'index.html',minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					minifyCSS: true
				}
			}),
			new CopyWebpackPlugin([

			])
		]
	}
];