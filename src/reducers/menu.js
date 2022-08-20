import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Authorized from '@/utils/Authorized';
// import { clearChildren } from '@/utils/utils';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
    return data
        .map(item => {
            if (!item.name || !item.path) {
                return null;
            }

            let locale = 'menu';
            if (parentName) {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }

            const result = {
                ...item,
                locale,
                authority: item.authority || parentAuthority
            };

            if (item.routes) {
                const children = formatter(item.routes, item.authority, locale);
                // result.children = children;
                result.routes = children;
            }

            delete result.children;
            // delete result.routes;
            return result;
        })
        .filter(Boolean);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    if (item.routes && !item.hideChildrenInMenu && item.routes.some(child => child.name && !child.hideInMenu)) {
        return {
            ...item,
            routes: filterMenuData(item.routes)
        };
    }
    return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }

    return (
        menuData
            // .filter(item => item.name && !item.hideInMenu)
            .map(item => check(item.authority, getSubMenu(item)))
            .filter(Boolean)
    );
};

const initialState = {
    menuData: []
};

export default (state = initialState, { type, payload = {} }) => {
    const { routes = [], authority } = payload;
    const menuData = filterMenuData(memoizeOneFormatter(routes, authority));
    switch (type) {
        case 'FETCH_MENUS':
            return { ...state, menuData };

        default:
            return state;
    }
};
