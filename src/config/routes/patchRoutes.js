import _ from 'lodash';

let redirects;

const patchRoutes = (routes, config = {}, isProduction, onPatchRoute) => {
    redirects = [];
    _patchRoutes(routes, config, isProduction, onPatchRoute);
    // hoist redirect
    routes.unshift(...redirects);
    return routes;
};

function _patchRoutes(routes, config, isProduction, onPatchRoute) {
    let notFoundIndex = null;

    routes.forEach((route, index) => {
        patchRoute(route, config, isProduction, onPatchRoute);
        if (route.path === '/404') {
            notFoundIndex = index;
        }
    });

    if (notFoundIndex !== null && isProduction) {
        const notFoundRoute = routes.slice(notFoundIndex, notFoundIndex + 1)[0];
        if (notFoundRoute.component) {
            routes.push({ component: notFoundRoute.component });
        } else if (notFoundRoute.redirect) {
            routes.push({ redirect: notFoundRoute.redirect });
        } else {
            throw new Error('Invalid route config for 404');
        }
    }

    const removedRoutes = _.remove(routes, route => {
        return route.redirect;
    });
    redirects = redirects.concat(removedRoutes);
}

function patchRoute(route, config, isProduction, onPatchRoute) {
    if (config.pages && config.pages[route.path] && config.pages[route.path].Route) {
        route.Route = config.pages[route.path].Route;
    }

    if (typeof onPatchRoute === 'function') {
        onPatchRoute(route);
    }

    if (route.routes) {
        _patchRoutes(route.routes, config, isProduction, onPatchRoute);
    }
}

export { patchRoutes as default, patchRoute, patchRoutes };
