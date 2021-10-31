const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env = 'development', argv) => {
    const mode = argv.env || env;
    const isProduction = mode === 'production';
    const port = parseInt(process.env.PORT, 10) || 8800;
    const { analyze: isAnalyze } = argv;

    return {
        mode,
        devtool: isProduction ? 'none' : 'inline-source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? 'assets/js/[name].[hash:8].js' : 'assets/js/[name].bundle.js',
            chunkFilename: isProduction ? 'assets/js/[name].[hash:8].chunk.js' : 'assets/js/[name].chunk.js',
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
                            envName: isProduction ? 'production' : 'development'
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    mode: resourcePath => {
                                        if (/node_modules/i.test(resourcePath) || /global.css$/i.test(resourcePath)) {
                                            return 'global';
                                        }

                                        return 'local';
                                    },
                                    exportLocalsConvention: 'camelCase',
                                    localIdentName: isProduction
                                        ? '[hash:base64:6]'
                                        : '[path][name]__[local]--[hash:base64:5]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: isProduction ? '[hash:base64:6]' : '[path][name]__[local]--[hash:5]'
                                }
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                },
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
                    test: /\.(png|jpg|gif|jpeg)$/i,
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
                },
                {
                    test: /\.worker\.js$/,
                    loader: 'worker-loader'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            isProduction &&
                new MiniCssExtractPlugin({
                    filename: 'assets/css/[name].[contenthash:8].css',
                    chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
                }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                favicon: path.resolve(__dirname, 'public/favicon.ico'),
                inject: true
            }),
            // new MonacoWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
            }),
            isAnalyze && new BundleAnalyzerPlugin({ analyzerMode: 'server' }),
            !isProduction && new webpack.HotModuleReplacementPlugin()
            // new WorkboxPlugin.GenerateSW({
            //   swDest: "service-worker.js",
            //   clientsClaim: true,
            //   skipWaiting: true,
            //   maximumFileSizeToCacheInBytes: 10000000,
            // }),
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserWebpackPlugin({
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
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `${cacheGroupKey}.${packageName.replace('@', '')}`;
                        }
                    }
                    // commons: {
                    //   name: "commons",
                    //   minChunks: 2,
                    //   priority: -10,
                    // },
                    // styles: {
                    //   // name: "styles",
                    //   test: /\.css$/,
                    //   chunks: "all",
                    //   enforce: true,
                    // },
                }
            },
            runtimeChunk: 'single'
        },
        devServer: {
            port,
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
};
