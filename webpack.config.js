var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:[
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        './panel/preserve'
    ],
    output:{
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/static',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        })
    ],
    module:{
        loaders:[{
            test:/\.(js|jsx)$/,
            loaders:['babel'],
            include: path.join(__dirname, 'panel'),
            plugins: [
                'add-module-exports',
                'typecheck',
                'transform-decorators-legacy',
                'antd',
            ],
        },{
            test:/\.css$/,
            loader:'style!css',
        },{
            test:/\.less$/,
            loader:'style!less',
        }]
    }
};
