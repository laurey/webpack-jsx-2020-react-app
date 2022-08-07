import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import defaultRoutes from '../common/route';

function TopHeader(props) {
    const { theme, isMobile, collapsed, layout, fixedHeader, navHeight, menusData } = props;
    const isTop = layout === 'topmenu';

    const { pathname } = useLocation();

    const width = useMemo(() => {
        if (isMobile || !fixedHeader || isTop) {
            return '100%';
        }

        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 230px)';
    }, [isMobile, fixedHeader, isTop, collapsed]);

    return (
        <div
            className="rtc-top-header"
            style={{
                width
            }}
        >
            <Menu theme={theme} selectedKeys={[pathname]} mode="horizontal" style={{ lineHeight: `${navHeight}px` }}>
                {menusData
                    .filter(menu => !menu.hideInMenu)
                    .map(menu => {
                        return (
                            <Menu.Item key={menu.path.pathname || menu.path}>
                                <Link to={menu.path}>{menu.name}</Link>
                            </Menu.Item>
                        );
                    })}
            </Menu>
        </div>
    );
}

TopHeader.propTypes = {
    theme: PropTypes.string,
    menusData: PropTypes.array
};

TopHeader.defaultProps = {
    theme: 'dark',
    isMobile: false,
    collapsed: false,
    menusData: defaultRoutes
};

export default TopHeader;
