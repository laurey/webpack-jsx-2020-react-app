const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].bundle.js',
        chunkFilename: 'assets/js/[name].chunk.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.jsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                include: [path.resolve(__dirname, 'src')],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: 'development'
                    }
                }
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: [path.resolve(__dirname, 'src')],
                include: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                mode: 'global',
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'React-JSX-2019',
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    devServer: {
        port: parseInt(process.env.PORT, 10) || 8800,
        hot: true,
        open: true,
        overlay: true,
        compress: true,
        host: 'localhost',
        stats: 'minimal',
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist')
    }
};

module.exports = merge(baseConfig, devConfig);
