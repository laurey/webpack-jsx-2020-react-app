import React, { useCallback, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Layout, Icon } from 'antd';

import useBasicLayoutContext from '../contexts/useBasicLayoutContext';
import SiderMenuWrapper from '../components/SiderMenu';
import NotFound from '../components/NotFound';
import FooterLayout from './FooterLayout';
import Header from './HeaderLayout';
import Demo from '../pages/Demo';
import Home from '../pages/HomePage';
import LogOut from '../pages/LogOut';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Counter from '../pages/Counter';
import Comments from '../pages/CommentsPage';
import Employees from '../pages/EmployeesPage';
import Albums from '../pages/AlbumsPage';
import Exception from '../pages/Exception';
import Posts from '../pages/PostsPage';
import Blogs from '../pages/BlogsPage';
import Todos from '../pages/TodosPage';
import Users from '../pages/UsersPage';
import RedirectPage from '../pages/RedirectPage';
import logo from '../assets/logo.png';
import styles from './styles.less';

const HeaderLayout = React.memo(Header);

const { Content } = Layout;

function BlankLayout(props) {
    const [collapsed, setCollapsed] = useState(false);
    const { currentLayout: layout } = useBasicLayoutContext();
    const { isMobile } = props;
    const { navTheme, siderTheme, siderPos, fixedHeader } = layout;
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const trigger = (
        <span className="sidermenu-trigger-icon outer-trigger">
            <Icon type={collapsed ? 'right' : 'left'} />
        </span>
    );

    const handleMenuCollapse = useCallback(() => {
        setCollapsed(state => !state);
    }, [setCollapsed]);

    return (
        <Layout className="rtc-layout rtc-basic-layout">
            <HeaderLayout
                logo={logo}
                layout={layout}
                theme={navTheme}
                isMobile={isMobile}
                collapsed={collapsed}
                onCollapse={handleMenuCollapse}
                {...props}
            />
            <Layout
                style={{
                    overflow: 'auto',
                    height: `calc(100vh - 130px)`,
                    maxHeight: `calc(100vh - 64px * 2)`
                }}
            >
                {siderPos === 'left' && (
                    <SiderMenuWrapper
                        collapsible
                        key="left"
                        logo={logo}
                        trigger={trigger}
                        theme={siderTheme}
                        isMobile={isMobile}
                        collapsed={collapsed}
                        onCollapse={handleMenuCollapse}
                    />
                )}
                <Content
                    className={classNames('rtc-page-header-wrapper', styles.content)}
                    style={{ padding: 24, ...contentStyle }}
                >
                    <div className="rtc-page-header-wrapper-content">
                        <Card title="Card title">
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/home" render={props => <Home {...props} />} />
                                <Route path="/posts">{props => <Posts {...props} />}</Route>
                                <Route path="/comments" component={Comments} />
                                <Route path="/blogs" component={Blogs} />
                                <Route path="/counter" component={Counter} />
                                <Route path="/signup" component={SignUp} />
                                <Route path="/signin" component={SignIn} />
                                <Route path="/demo" component={Demo} />
                                <Route path="/users" component={Users} />
                                <Route path="/todos" component={Todos} />
                                <Route path="/redirect" component={RedirectPage} />
                                <Route path="/employees" component={Employees} />
                                <Route path="/signout" component={LogOut} />
                                <Route path="/albums" component={Albums} />
                                <Route path={['/logout', '/old_blogs']}>
                                    {({ location, ...rest }) => {
                                        let redirect = '/exception';
                                        const { pathname } = location;
                                        if (pathname === '/logout') {
                                            redirect = '/signout';
                                        } else if (pathname === '/old_blogs') {
                                            redirect = '/posts';
                                        }

                                        return (
                                            <Redirect
                                                to={{
                                                    pathname: redirect,
                                                    state: location.state,
                                                    search: location.search
                                                }}
                                                {...rest}
                                            />
                                        );
                                    }}
                                </Route>
                                <Route path="/exception/:type?" component={Exception} />
                                {/* <Redirect from="/blogs" to="/posts" /> */}
                                <Redirect from="/join" to="/signup" />
                                <Redirect from="/register" to="/signin" />
                                <Route component={NotFound} />
                            </Switch>
                        </Card>
                    </div>
                </Content>
                {siderPos === 'right' && (
                    <SiderMenuWrapper
                        collapsible
                        key="right"
                        logo={logo}
                        theme={siderTheme}
                        trigger={trigger}
                        collapsed={collapsed}
                        onCollapse={handleMenuCollapse}
                    />
                )}
            </Layout>
            <FooterLayout>Footer ©2021</FooterLayout>
        </Layout>
    );
}

export default BlankLayout;
