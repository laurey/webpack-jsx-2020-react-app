import React from 'react';
import _ from 'lodash';
import slash from 'slash2';
import { isAbsolute } from 'path';

import NotFound from '../../components/NotFound';
import getRouteConfig from './getRouteConfig';
// import routesToJSON from "./routesToJSON";

function modifyRoutes(paths, args) {
    const notFoundRoute = {
        component: props => <NotFound {...props} pagesPath={paths.pagesPath} />
    };

    const routes = _.cloneDeep(args);

    function handleNotFound(route) {
        if (!route.routes) {
            return;
        }

        route.routes.forEach(handleNotFound);
        route.routes.push(notFoundRoute);
    }

    routes.forEach(handleNotFound);
    routes.push(notFoundRoute);

    return routes;
}

function fetchRoutes(paths, config, onPatchRoute) {
    const routes = getRouteConfig(paths, config, onPatchRoute);
    return modifyRoutes(paths, routes);
}

function getRoutes(paths, config, onPatchRoute) {
    const routes = fetchRoutes(paths, config, onPatchRoute);
    // return routesToJSON(paths, routes);
    return routes;
}

function getComponents(config, routes) {
    return routes.reduce((aac, route) => {
        if (_.isString(route.component)) {
            const component = isAbsolute(route.component)
                ? route.component
                : require.resolve(_.join(config.cwd, route.component));
            aac.push(slash(component));
        }

        if (route.routes) {
            aac = aac.concat(getComponents(config, route.routes));
        }
        return aac;
    }, []);
}

// function getRouteComponents(paths, config, onPatchRoute) {
//     const routes = getRoutes(paths, config, onPatchRoute);
//     return _.uniq(routes);
// }

export { getRoutes as default, getRoutes, fetchRoutes, getComponents };
