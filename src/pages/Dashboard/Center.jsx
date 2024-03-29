import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

import styles from './style.less';

const { SubMenu } = Menu;

class Sider extends React.Component {
    // submenu keys of first level
    rootSubmenuKeys = ['/sub1', '/sub2', '/sub4'];

    state = {
        openKeys: ['/sub1']
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    render() {
        return (
            <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ width: 256 }}>
                <SubMenu
                    key="/sub1"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>Navigation One</span>
                        </span>
                    }
                >
                    <Menu.Item key="/1">Option 1</Menu.Item>
                    <Menu.Item key="/2">Option 2</Menu.Item>
                    <Menu.Item key="/3">Option 3</Menu.Item>
                    <Menu.Item key="/4">Option 4</Menu.Item>
                </SubMenu>
                {/* <SubMenu
                    key="/sub2"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>Navigation Two</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu> */}
                <SubMenu
                    key="/sub4"
                    title={
                        <span>
                            <Icon type="setting" />
                            <span>Navigation Three</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

class Center extends Component {
    render() {
        return (
            <div className={styles.center}>
                <h2>Center</h2>
                <Sider />
            </div>
        );
    }
}

export default Center;
