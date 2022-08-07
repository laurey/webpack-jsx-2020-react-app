import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Authorized from '@/utils/Authorized';

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
                // Reduce memory usage
                result.children = children;
            }
            delete result.routes;
            return result;
        })
        .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children)
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
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item);
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
