import { stringify } from 'qs';

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export const childKey = ['routes'];

export const clearChildren = (menuData = []) => {
    return menuData
        .map(item => {
            const routerChildren = item.children || item['route'];
            if (Array.isArray(routerChildren) && routerChildren.length > 0) {
                const newChildren = clearChildren(routerChildren);
                if (newChildren.length) return { ...item, ['route']: newChildren };
            }
            const finallyItem = { ...item };
            delete finallyItem['route'];
            delete finallyItem.children;
            return finallyItem;
        })
        .filter(Boolean);
};

export const getFlatMenuKeys = menuData => {
    let keys = [];
    menuData.forEach(item => {
        keys.push(item.path);
        const children = item.routes || item.children;
        if (children) {
            keys = keys.concat(getFlatMenuKeys(children));
        }
    });
    return keys;
};

export function clearMenuItem(menusData) {
    return menusData
        .map(item => {
            const finalItem = { ...item };
            // if (!finalItem.name || finalItem.hideInMenu) {
            //     return null;
            // }

            if (!finalItem.name) {
                return null;
            }

            if (finalItem && finalItem?.routes) {
                if (
                    !finalItem.hideChildrenInMenu &&
                    finalItem.routes.some(child => child && child.name && !child.hideInMenu)
                ) {
                    return {
                        ...item,
                        routes: clearMenuItem(finalItem.routes)
                    };
                }
                // children 为空就直接删掉
                delete finalItem.routes;
            }
            return finalItem;
        })
        .filter(Boolean);
}

export function getMatchMenu(menuData, pathname) {
    return menuData;
}
