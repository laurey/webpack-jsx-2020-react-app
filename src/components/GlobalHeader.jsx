import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
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
        name: 'RateControl',
        path: '/rateControl'
    }
];

function GlobalHeader({ theme = 'dark' }) {
    const { pathname } = useLocation();
    return (
        <div>
            <Header>
                <Menu theme={theme} selectedKeys={[pathname]} mode="horizontal" style={{ lineHeight: '64px' }}>
                    {routes.map(route => {
                        return (
                            <Menu.Item key={route.path}>
                                <Link to={route.path}>{route.name}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Header>
        </div>
    );
}

GlobalHeader.propTypes = {
    theme: PropTypes.string
};

export default GlobalHeader;
