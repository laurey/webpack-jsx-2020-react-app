import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import TopHeader from '../components/TopHeader';
import GlobalHeader from '../components/GlobalHeader';

const { Header } = Layout;

function HeaderLayout(props) {
    const { isMobile, theme, autoHideHeader, fixedHeader, onCollapse } = props;

    const [visible, setVisible] = useState(true);
    const handleScroll = useCallback(() => {
        if (!autoHideHeader) {
            return;
        }

        const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                if (this.oldScrollTop > scrollTop) {
                    setVisible(true);
                } else if (scrollTop > 300 && visible) {
                    setVisible(false);
                } else if (scrollTop < 300 && !visible) {
                    setVisible(true);
                }

                this.oldScrollTop = scrollTop;
                this.ticking = false;
            });
        }
    }, [autoHideHeader, visible]);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Header className={`rtc-layout-${theme || 'light'}-header ${fixedHeader ? 'rtc-layout-fixed-header' : ''}`}>
            {!isMobile ? (
                <TopHeader mode="horizontal" {...props} />
            ) : (
                <GlobalHeader onCollapse={onCollapse} {...props} />
            )}
        </Header>
    );
}

HeaderLayout.propTypes = {
    theme: PropTypes.string
};

export default HeaderLayout;
