import React from 'react';
import { Layout } from 'antd';
// import DocumentTitle from 'react-document-title';
// import isEqual from 'lodash/isEqual';
// import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
// import { ContainerQuery } from 'react-container-query';
// import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
// import Media from 'react-media';
import Authorized from '@/utils/Authorized';
import Footer from './FooterLayout';
import Header from './HeaderLayout';
// import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';
// import PageLoading from '@/components/Loading';
import SiderMenu from '@/components/SiderMenu';
// import { title } from '../defaultSettings';
import logo from '../assets/logo.png';
import styles from './styles.less';

const { Content } = Layout;

class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.getPageTitle = memoizeOne(this.getPageTitle);
        // this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
    }

    componentDidMount() {
        const {
            dispatch,
            route: { routes, authority }
        } = this.props;
        // dispatch({
        //     type: 'user/fetchCurrent'
        // });
        // dispatch({
        //     type: 'setting/getSetting'
        // });
        dispatch({
            type: 'FETCH_MENUS',
            payload: { routes, authority }
        });
    }

    componentDidUpdate(preProps) {
        // After changing to phone mode,
        // if collapsed is true, you need to click twice to display
        const { collapsed, isMobile } = this.props;
        if (isMobile && !preProps.isMobile && !collapsed) {
            this.handleMenuCollapse(false);
        }
    }

    getRouterAuthority = (pathname, routeData) => {
        let routeAuthority = ['noAuthority'];
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
        return getAuthority(pathname, routeData);
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

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'UPDATE_COLLAPSED',
            payload: collapsed
        });
    };

    render() {
        const {
            collapsed,
            children,
            isMobile,
            menuData,
            location: { pathname },
            route: { routes },
            fixedHeader
        } = this.props;

        const routerConfig = this.getRouterAuthority(pathname, routes);
        const contentStyle = !fixedHeader
            ? { paddingTop: 0, paddingLeft: collapsed ? 80 : 180 }
            : { paddingLeft: collapsed ? 80 : 180 };

        return (
            <Layout>
                <Header
                    menuData={menuData}
                    handleMenuCollapse={this.handleMenuCollapse}
                    logo={logo}
                    isMobile={isMobile}
                    {...this.props}
                />
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh'
                    }}
                >
                    <SiderMenu
                        logo={logo}
                        theme="light"
                        onCollapse={this.handleMenuCollapse}
                        menuData={menuData}
                        isMobile={isMobile}
                        {...this.props}
                    />
                    <Content className={styles.content} style={contentStyle}>
                        <Authorized authority={routerConfig} noMatch={<Exception403 />}>
                            {children}
                        </Authorized>
                        <Footer />
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
}))(BasicLayout);
