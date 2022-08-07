// import { join, resolve, isAbsolute } from 'path';
import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import LocaleWrapper from './LocaleWrapper';
import history from './history';
import routesConfig from './router.config';
import renderRoutes from './renderRoutes';
import getRoutes from './routes/getRoutes';
import getPaths from './getPaths';

const cwd = __dirname || process.cwd();
// console.log("__dirme => ", cwd, __dirname, process.cwd());
// console.log(resolve(cwd, "src"), resolve(cwd, "src"));
// console.log(join(cwd, "src"), join(cwd, "src"));

const routes = getRoutes(
    getPaths({
        cwd
    }),
    { routes: routesConfig }
);

export default class RouterWrapper extends React.Component {
    unListen() {}

    constructor(props) {
        super(props);

        // route change handler
        function routeChangeHandler(location, action) {}

        this.unListen = history.listen(routeChangeHandler);

        routeChangeHandler(history.location);
    }

    componentWillUnmount() {
        this.unListen();
    }

    render() {
        const props = this.props || {};
        return (
            <LocaleWrapper routes={routes}>
                <Router history={history}>{renderRoutes(routes, props)}</Router>
                {/* <BrowserRouter>{renderRoutes(routes, props)}</BrowserRouter> */}
            </LocaleWrapper>
        );
    }
}
