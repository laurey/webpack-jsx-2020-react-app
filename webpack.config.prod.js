const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].[contenthash:8].js',
        chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.css', '.less']
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
                        envName: 'production'
                    }
                }
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName: '[hash:base64:6]'
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
                exclude: [path.resolve(__dirname, 'src')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                mode: 'global',
                                localIdentName: '[hash:base64:6]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[hash:base64:6]'
                            }
                        }
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
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash:8].css',
            chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ].filter(Boolean),
    optimization: {
        minimize: true,
        runtimeChunk: 'single',
        minimizer: [
            new TerserWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false
                    },
                    compress: {
                        comparisons: false
                    },
                    mangle: {
                        safari10: true
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `${cacheGroupKey}.${packageName.replace('@', '')}`;
                    }
                },
                commons: {
                    test: /[\\/]src\/components[\\/]/,
                    // priority: -10,
                    minChunks: 1
                }
                // styles: {
                //   // name: "styles",
                //   test: /\.css$/,
                //   chunks: "all",
                //   enforce: true,
                // },
            }
        }
    }
};

module.exports = merge(baseConfig, prodConfig);
