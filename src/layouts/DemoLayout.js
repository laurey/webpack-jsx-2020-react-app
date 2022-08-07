import React, { Component } from 'react';
import { connect } from 'react-redux';
import Debounce from 'lodash-decorators/debounce';
import pathToRegexp from 'path-to-regexp';
import { Layout } from 'antd';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/Exception/403';
import Header from './SimpleHeader';
import Footer from './Footer';
import styles from './styles.less';
import logo from '@/assets/logo.png';

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

    /* eslint-disable*/
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

    render() {
        const {
            children,
            menuData,
            isMobile,
            location: { pathname },
            route: { routes }
        } = this.props;

        const routerConfig = this.getRouterAuthority(pathname, routes);

        return (
            <Layout>
                <Header
                    logo={logo}
                    menuData={menuData}
                    isMobile={isMobile}
                    hasSiderMenu={false}
                    handleMenuCollapse={this.handleMenuCollapse}
                    {...this.props}
                />
                <Content style={{ margin: '24px 24px 0', height: '100%' }} className={styles.content}>
                    <Authorized authority={routerConfig} noMatch={<Exception403 {...this.props} />}>
                        {children}
                    </Authorized>
                </Content>
                <Footer>
                    <div>This is Demo Layout Footer</div>
                </Footer>
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
