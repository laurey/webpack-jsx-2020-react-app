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

class GlobalHeader extends React.Component {
    render() {
        const { pathname } = this.props.location;
        return (
            <div>
                <Header>
                    <Menu
                        mode="horizontal"
                        theme={this.props.theme}
                        selectedKeys={[pathname]}
                        style={{ lineHeight: '64px' }}
                    >
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
}

GlobalHeader.defaultProps = {
    theme: 'dark'
};

GlobalHeader.propTypes = {
    theme: PropTypes.string
};

export default withRouter(GlobalHeader);
