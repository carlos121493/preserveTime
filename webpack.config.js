var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:[
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        './panel/preserve',
    ],
    output:{
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/static',
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.js', '.jsx'],
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new ExtractTextPlugin('[name].css', {
            disable: false,
            allChunks: true,
        }),
    ],
    module:{
        loaders:[{
            test:/\.(js|jsx)$/,
            loaders:['babel'],
            include: path.join(__dirname, 'panel'),
        },{
            test:/\.css$/,
            loader: ExtractTextPlugin.extract('css'),
        },{
            test:/\.less$/,
            loader: ExtractTextPlugin.extract('css!less?{"sourceMap":true,"modifyVars":${JSON.stringify(pkg.theme || {})}}'),
        }]
    }
};
