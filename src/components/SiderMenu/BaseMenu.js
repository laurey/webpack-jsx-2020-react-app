import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Menu, Icon } from 'antd';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '../../utils/utils';
import styles from './index.less';

const { SubMenu } = Menu;

const getIcon = icon => {
    if (typeof icon === 'string' && isUrl(icon)) {
        return <img src={icon} alt="icon" className={styles.icon} />;
    }
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
};

export default class BaseMenu extends PureComponent {
    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems = (menusData, parent) => {
        if (!menusData) {
            return null;
        }

        return menusData.map(item => this.getSubMenuOrItem(item, parent)).filter(Boolean);
    };

    // Get the currently selected menu
    getSelectedMenuKeys = pathname => {
        const { flatMenuKeys } = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
    };

    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem = (item, isChildren) => {
        if (Array.isArray(item.routes) && item.routes.length > 0) {
            const name = this.getIntlName(item);
            return (
                <SubMenu
                    key={item.key || item.path}
                    title={
                        item.icon ? (
                            <span title={name}>
                                {getIcon(item.icon)}
                                <span>{name}</span>
                            </span>
                        ) : (
                            <span title={name}>
                                <span>{name}</span>
                            </span>
                        )
                    }
                >
                    {this.getNavMenuItems(item.routes, true)}
                </SubMenu>
            );
        }

        const style = {};
        if (item.hideInMenu) {
            Object.assign(style, {
                display: 'none'
            });
        }

        return (
            <Menu.Item key={item.key || item.path} style={style}>
                {this.getMenuItemPath(item, isChildren)}
            </Menu.Item>
        );
    };

    getMenuItemPath = (item, isChildren) => {
        const { prefixCls } = this.props;
        const { name, label, text } = item;
        const itemPath = this.conversionPath(item.path);
        const icon = isChildren ? null : getIcon(item.icon);
        const { target } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <span
                    title={name}
                    onClick={() => {
                        window?.open?.(itemPath);
                    }}
                    className={`${prefixCls}-menu-item ${prefixCls}-menu-item-link`}
                >
                    {icon}
                    <span className={`${prefixCls}-menu-item-title`}>{name}</span>
                </span>
            );
        }

        const { location, isMobile, onCollapse } = this.props;
        return (
            <Link
                to={itemPath}
                target={target}
                // replace={itemPath === location.pathname}
                // onClick={
                //     isMobile
                //         ? () => {
                //               onCollapse(true);
                //           }
                //         : undefined
                // }
            >
                <span>
                    {icon}
                    <span>{label || text || name}</span>
                </span>
            </Link>
        );
    };

    getIntlName = item => {
        const { name, label, text, locale } = item;
        const txt = label || text || name;
        const { menu, formatMessage } = this.props;
        if (locale && menu?.locale !== false && menu?.disableLocale !== true) {
            return formatMessage?.({
                id: locale,
                defaultMessage: txt
            });
        }
        return txt;
    };

    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    render() {
        const {
            openKeys,
            theme,
            mode,
            location: { pathname },
            className,
            collapsed
        } = this.props;
        // if pathname can't match, use the nearest parent's key
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }

        let props = {};
        if (openKeys && !collapsed) {
            props = {
                openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
            };
        }

        const { handleOpenChange, style, menuData } = this.props;
        const cls = classNames(className, {
            'top-nav-menu': mode === 'horizontal'
        });

        const finallyData = this.props.postMenuData ? this.props.postMenuData(menuData) : menuData;

        if (finallyData && finallyData?.length < 1) {
            return null;
        }

        // console.log(JSON.stringify({ finallyData, pathname }));
        return (
            <Menu
                key="Menu"
                mode={mode}
                theme={theme}
                onOpenChange={handleOpenChange}
                selectedKeys={selectedKeys}
                style={style}
                className={cls}
                {...props}
            >
                {this.getNavMenuItems(finallyData, false)}
            </Menu>
        );
    }
}
