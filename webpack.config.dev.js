const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const ansiColors = {
    red: '00FF00' // note the lack of "#"
};
const overlayStyles = {
    color: '#FF0000' // note the inclusion of "#" (these options would be the equivalent of div.style[option] = value)
};
const hotMiddlewareScript =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&ansiColors=' +
    encodeURIComponent(JSON.stringify(ansiColors)) +
    '&overlayStyles=' +
    encodeURIComponent(JSON.stringify(overlayStyles));

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [hotMiddlewareScript, './src'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].bundle.js',
        chunkFilename: 'assets/js/[name].chunk.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
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
                        // babelrc: true,
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
                include: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                            // when modules is boolean , DONOT work
                            // modules: {
                            //     mode: 'global',
                            //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            // }
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'React-JSX-2020',
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
            inject: true
        })
    ].filter(Boolean)
};

module.exports = merge(baseConfig, devConfig);
