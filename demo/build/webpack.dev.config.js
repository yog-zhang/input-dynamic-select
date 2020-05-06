const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        hot: true,
        clientLogLevel: 'none',
        publicPath: '/',
        proxy: {
            '/mock': {
                target: 'http://localhost:8088',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})