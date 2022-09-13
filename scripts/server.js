const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.dev');

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    // stats: {
    //     colors: true
    // }
});

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerOptions);

const runServer = async () => {
    console.log('Starting server...');
    return await server.listen(parseInt(process.env.PORT, 10) || 8800, 'localhost', err => {
        if (err) {
            return console.log(err);
        }

        console.log('Starting server on http://localhost:8800');
        console.log('');
    });
};

runServer();
