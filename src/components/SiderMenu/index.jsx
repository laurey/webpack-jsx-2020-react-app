import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
    const { isMobile, menuData, collapsed, onCollapse, hide, splitMenus } = props;
    if (menuData && menuData?.length < 1 && splitMenus) {
        return null;
    }

    if (hide) {
        return null;
    }

    return isMobile ? (
        <Drawer
            placement="left"
            visible={!collapsed}
            onClose={() => onCollapse(true)}
            style={{
                padding: 0,
                height: '100vh'
            }}
        >
            <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
        </Drawer>
    ) : (
        <SiderMenu {...props} />
    );
};

export default SiderMenuWrapper;
