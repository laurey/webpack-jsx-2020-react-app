import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Icon, Layout } from 'antd';
import BaseMenu from './BaseMenu';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import styles from './index.less';

const { Sider } = Layout;

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname } = state;
        if (props.location.pathname !== pathname) {
            return {
                pathname: props.location.pathname,
                openKeys: getDefaultCollapsedSubMenus(props)
            };
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
        });
    };

    render() {
        const { logo, isMobile, collapsed, onCollapse, fixSiderbar, theme } = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys };

        const siderClassName = classNames(styles.sider, {
            [styles.fixSiderbar]: fixSiderbar,
            [styles.light]: theme === 'light'
        });
        return (
            <Sider
                collapsible
                width={180}
                breakpoint="lg"
                theme={theme}
                collapsed={collapsed}
                trigger={isMobile ? null : <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />}
                onCollapse={onCollapse}
                className={siderClassName}
            >
                {logo ? (
                    <div className={styles.logo} id="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                ) : null}
                <BaseMenu
                    key="base-menu"
                    {...this.props}
                    mode="inline"
                    handleOpenChange={this.handleOpenChange}
                    onOpenChange={this.handleOpenChange}
                    style={{ padding: '16px 0', width: '100%' }}
                    {...defaultProps}
                />
            </Sider>
        );
    }
}
