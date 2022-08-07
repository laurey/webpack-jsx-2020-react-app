/**
 * @file src/config/routes/getRouteConfig
 */

// import { join } from 'path';
// import { existsSync } from 'fs';
import patchRoutes from './patchRoutes';
import getRouteConfigFromConfig from './getRouteConfigFromConfig';
// import getRouteConfigFromConfigFile from './getRouteConfigFromConfigFile';

const getRouteConfig = (paths, config, onPatchRoute) => {
    let routes = null;
    // const routeConfigFile = join(paths.absSrcPath, 'routes.config.json');
    if (config.routes) {
        routes = getRouteConfigFromConfig(config.routes, paths.pagesPath);
    }

    patchRoutes(routes, config, process.env.NODE_ENV === 'production', onPatchRoute);
    return routes;
};

export default getRouteConfig;
