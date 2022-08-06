import _ from 'lodash';
import isUrl from 'is-url';
import slash from 'slash2';
import { join, isAbsolute } from 'path';

const getRouteConfigFromConfig = (routes, pagesPath = 'src/pages', parentRoutePath = '/') => {
    return patchRoutes(routes, pagesPath, parentRoutePath);
};

function patchRoutes(routes, pagesPath, parentRoutePath) {
    return routes.map(route => {
        return patchRoute(route, pagesPath, parentRoutePath);
    });
}

function patchRoute(route, pagesPath, parentRoutePath) {
    route = _.clone(route);

    if (route.component) {
        route.component = resolveComponent(pagesPath, route.component);
    }

    if (route.path && route.path.charAt(0) !== '/') {
        if (isUrl(route.path)) {
            route.path = slash(route.path);
        } else {
            route.path = slash(join(parentRoutePath, route.path));
        }
    }

    if (route.redirect && route.redirect.charAt(0) !== '/') {
        route.redirect = slash(join(parentRoutePath, route.redirect));
    }

    if (route.routes) {
        route.routes = patchRoutes(route.routes, pagesPath, route.path);
    } else if (!('exact' in route)) {
        route.exact = true;
    }

    return route;
}

function resolveComponent(pagesPath, component) {
    if (!_.isString(component)) {
        return component;
    }

    if (isAbsolute(component)) {
        return slash(component);
    }

    const ret = slash(join(pagesPath, component));
    if (ret.indexOf('./') !== 0) {
        return `./${ret}`;
    }
}

export default getRouteConfigFromConfig;
