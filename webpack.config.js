const { resolve } = require('path');
const apiMocker = require('mocker-api');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: './app/index.ts',
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist')
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	devtool: 'source-map',
	devServer: {
		onBeforeSetupMiddleware: function (devServer) {}
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	plugins: [
		new ProgressBarPlugin(),
		new HtmlWebpackPlugin({
			template: `${__dirname}/app/index.html`,
			filename: 'index.html',
			inject: 'body'
		})
	]
};
