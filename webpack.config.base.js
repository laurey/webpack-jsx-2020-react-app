const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    cache: true,
    context: __dirname,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.jsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|otf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/fonts/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpe?g)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
            inject: true
        })
    ].filter(Boolean)
};
