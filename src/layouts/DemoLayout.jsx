import React, { Component } from 'react';
import { connect } from 'react-redux';
import pathToRegexp from 'path-to-regexp';
import Debounce from 'lodash-decorators/debounce';
import { Layout, Alert } from 'antd';
import Footer from './Footer';
import SimpleHeader from './SimpleHeader';
import SiderMenu from '@/components/SiderMenu';
import { clearMenuItem, clearChildren, getFlatMenuKeys } from '@/utils/utils';
import logo from '@/assets/logo.png';
import styles from './styles.less';

const { Content } = Layout;

class DemoLayout extends Component {
    componentDidMount() {
        const {
            dispatch,
            route: { routes, authority }
        } = this.props;
        // dispatch({
        //     type: 'fetchCurrent'
        // });
        // dispatch({
        //     type: 'fetchSetting'
        // });
        dispatch({
            type: 'FETCH_MENUS',
            payload: { routes, authority }
        });
        this.triggerResizeEvent();
    }

    componentWillUnmount() {
        if (this.handler) {
            this.handler.cancel();
        }
    }

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'UPDATE_COLLAPSED',
            payload: { collapsed }
        });
        this.triggerResizeEvent();
    };

    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    getRouterAuthority = (pathname, routeList) => {
        let routeAuthority = ['guest'];
        const getAuthority = (key, routes) => {
            routes.forEach(route => {
                if (route.path && pathToRegexp(route.path).test(key)) {
                    routeAuthority = route.authority;
                } else if (route.routes) {
                    routeAuthority = getAuthority(key, route.routes);
                }
                return route;
            });
            return routeAuthority;
        };
        return getAuthority(pathname, routeList);
    };

    getLayoutStyle = () => {
        const { fixSiderbar, isMobile, collapsed, layout } = this.props;
        if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
            return {
                paddingLeft: collapsed ? 80 : 180
            };
        }
        return null;
    };

    render() {
        const { collapsed, children, isMobile, menuData, fixedHeader } = this.props;

        const contentStyle = !fixedHeader
            ? { paddingTop: 0, paddingLeft: collapsed ? 80 : 180 }
            : { paddingLeft: collapsed ? 80 : 180 };

        const flatMenuKeys = getFlatMenuKeys(menuData || []);
        const clearMenuData = clearChildren(clearMenuItem(menuData || []));

        return (
            <Layout>
                <SimpleHeader
                    logo={logo}
                    isMobile={isMobile}
                    flatMenuKeys={flatMenuKeys}
                    {...this.props}
                    onCollapse={this.handleMenuCollapse}
                    menuData={clearMenuData}
                />
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh'
                    }}
                >
                    <SiderMenu
                        theme="light"
                        isMobile={isMobile}
                        flatMenuKeys={flatMenuKeys}
                        {...this.props}
                        onCollapse={this.handleMenuCollapse}
                        menuData={clearMenuData}
                    />
                    <Content className={styles.content} style={contentStyle}>
                        <Alert message="It is from DemoLayout" type="info" />
                        {children}
                        <Footer>
                            <div>Demo Footer 2020</div>
                        </Footer>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ global, setting, menu }) => ({
    collapsed: global.collapsed,
    layout: setting.layout,
    menuData: menu.menuData,
    ...setting
}))(DemoLayout);
