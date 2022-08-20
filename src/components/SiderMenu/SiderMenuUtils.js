import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../_utils/pathTools';

export const getMenuMatches = (flatMenuKeys, path) =>
    flatMenuKeys.filter(item => {
        if (item) {
            return pathToRegexp(item).test(path);
        }
        return false;
    });

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
export const getDefaultCollapsedSubMenus = props => {
    const {
        location: { pathname },
        flatMenuKeys
    } = props;
    return urlToList(pathname)
        .map(item => getMenuMatches(flatMenuKeys, item)[0])
        .filter(item => item);
};
