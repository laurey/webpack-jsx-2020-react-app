import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import styles from './SimpleHeader.less';
import routes from '../common/route';
import { urlToList } from '@/components/_utils/pathTools';
import { getMenuMatches } from '@/components/SiderMenu/SiderMenuUtils';
// import { getFlatMenuKeys } from '@/utils/utils';

const { Header } = Layout;

class SimpleHeader extends React.PureComponent {
    state = {
        maxWidth: undefined
    };

    static getDerivedStateFromProps(props) {
        return {
            maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40
        };
    }

    getHeadWidth = () => {
        const { isMobile, collapsed, setting } = this.props;
        const { fixedHeader, layout } = setting;
        if (isMobile || !fixedHeader || layout === 'topmenu') {
            return '100%';
        }

        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    };

    getSelectedMenuKeys = pathname => {
        const { flatMenuKeys } = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
    };

    render() {
        const { openKeys, collapsed, menuData, location, className, contentWidth, setting, logo } = this.props;
        const { navTheme, fixedHeader } = setting;
        const { pathname } = location;
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }

        // const flatMenuKeys = getFlatMenuKeys(menuData);

        let props = {};
        if (openKeys && !collapsed) {
            props = {
                openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
            };
        }

        const cls = classNames(className, {
            [styles.fixedHeader]: fixedHeader
        });
        const width = this.getHeadWidth();

        return (
            <Header style={{ padding: 0, width }} className={cls}>
                <div className={`${styles.head} ${navTheme === 'light' ? styles.light : ''}`}>
                    <div
                        ref={ref => {
                            this.maim = ref;
                        }}
                        className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
                    >
                        <div className={styles.left}>
                            <div className={styles.logo} key="logo" id="logo">
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                            <div
                                style={{
                                    maxWidth: this.state.maxWidth
                                }}
                            >
                                <Menu
                                    mode="horizontal"
                                    theme={navTheme}
                                    selectedKeys={[pathname]}
                                    className={styles.menu}
                                    {...props}
                                >
                                    {routes
                                        .filter(route => !route.hideInMenu)
                                        .map(route => {
                                            return (
                                                <Menu.Item key={route.path}>
                                                    <Link to={route.path}>{route.name}</Link>
                                                </Menu.Item>
                                            );
                                        })}
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }
}

SimpleHeader.defaultProps = {
    theme: 'dark'
};

SimpleHeader.propTypes = {
    theme: PropTypes.string,
    collapsed: PropTypes.bool
};

export default connect(({ global, setting }) => ({
    setting,
    collapsed: global.collapsed
}))(SimpleHeader);
