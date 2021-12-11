import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const routes = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Topics',
        path: '/topics'
    },
    {
        name: 'Counter',
        path: '/counter'
    },
    {
        name: 'Posts',
        path: '/posts'
    },
    {
        name: 'Users',
        path: '/users'
    },
    {
        name: 'Comments',
        path: '/comments'
    },
    {
        name: 'RateControl',
        path: '/rateControl'
    }
];

const GlobalHeader = props => {
    const { location, theme, className } = props;
    const { pathname } = location;
    return (
        <Header className={className}>
            <Menu mode="horizontal" theme={theme} selectedKeys={[pathname]} style={{ lineHeight: '64px' }}>
                {routes.map(route => {
                    return (
                        <Menu.Item key={route.path}>
                            <Link to={route.path}>{route.name}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Header>
    );
};

GlobalHeader.defaultProps = {
    theme: 'dark'
};

GlobalHeader.propTypes = {
    theme: PropTypes.string
};

export default withRouter(GlobalHeader);
