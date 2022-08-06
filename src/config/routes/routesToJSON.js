import { relative, isAbsolute, join } from 'path';
import slash from 'slash2';
import _ from 'lodash';
import loadable from '@loadable/component';
// import About from "../../pages/About";
import Loading from '../../components/Loading';

// const OtherComponent = loadable(() => import("../../containers/Demo"), {
//   fallback: Loading,
// });

// let targetLevel = null;
// let level = 0;

const routesToJSON = (paths, routes) => {
    // if (process.env.CODE_SPLITTING_LEVEL) {
    //   targetLevel = process.env.CODE_SPLITTING_LEVEL;
    // } else {
    //   targetLevel = 1;
    //   const routesHaveChild = routes.filter(
    //     (route) => route.routes && route.routes.length
    //   );
    //   if (routesHaveChild.length) {
    //     targetLevel = 2;
    //   }
    // }

    const clonedRoutes = _.cloneDeep(routes);
    patchRoutes(paths, clonedRoutes);
    return clonedRoutes;
};

function patchRoutes(paths, routes) {
    // level += 1;
    routes.forEach(route => {
        patchRoute(paths, route);
    });
    // level -= 1;
}

export function normalizeEntry(entry) {
    return entry
        .replace(/^.(\/|\\)/, '')
        .replace(/(\/|\\)/g, '__')
        .replace(/\.jsx?$/, '')
        .replace(/\.tsx?$/, '');
}

function patchRoute(paths, route) {
    if (Object.prototype.hasOwnProperty.call(route, 'component') && _.isString(route.component)) {
        const importPath = isAbsolute(route.component)
            ? route.component
            : slash(join('../../', relative(paths.absSrcPath, route.component)));
        // console.log(JSON.stringify(paths));
        // console.log("ima => ", importPath, route.component);
        // import(importPath).then((module) => {
        //   console.log("aaaa");
        //   console.log(module);
        // });
        // import("../../pages/About").then((module) => {
        //   console.log("bbbbb");
        //   console.log(module.default);
        // });

        Object.assign(route, {
            // component: About,
            // component: OtherComponent,
            // component: loadable(() => import(importPath)),
            component: loadable(() => import(importPath), {
                fallback: Loading
            })
        });
    }

    if (Object.prototype.hasOwnProperty.call(route, 'Routes') && Array.isArray(route.Routes)) {
        Object.assign(route, {
            Routes: route.Routes.map(data => {
                const importPath = isAbsolute(data) ? data : relative(paths.absSrcPath, data);
                return loadable(() => import(slash(importPath)));
            })
        });
    }

    if (Array.isArray(route.routes)) {
        patchRoutes(paths, route.routes);
    }
}

export default routesToJSON;
