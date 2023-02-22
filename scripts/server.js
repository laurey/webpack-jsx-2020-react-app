// const path = require('path');
const webpack = require('webpack');
const express = require('express');
const history = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.dev');

const port = parseInt(process.env.PORT, 10) || 8800;

const compiler = webpack(webpackConfig);
const app = express();

// webpack-dev-middleware options
const options = {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal',
    // writeToDisk: true
    // headers: () => {
    //     return {
    //         'Last-Modi-fied111': new Date()
    //     };
    // }
    headers: (req, res, context) => {
        res.setHeader('Last-Modified', new Date());
    }
};

const instance = webpackDevMiddleware(compiler, options);

app.use(express.static(webpackConfig.output.path));
app.use(history());
app.use(instance);
app.use(
    webpackHotMiddleware(compiler, {
        log: false,
        path: '/__webpack_hmr',
        heartbeat: 2000
    })
);

// works with `writeToDisk: true`, not needed with history-api-fallback
// app.get('*', (req, res) => {
//     return res.sendFile('./index.html', {
//         root: webpackConfig.output.path
//     });
// });

const runServer = async () => {
    return await app.listen(port, 'localhost', err => {
        if (err) {
            instance.close();
            return console.log(err);
        }

        console.log('App runs on http://localhost:' + port);
        console.log('');
    });
};

instance.waitUntilValid(runServer);
