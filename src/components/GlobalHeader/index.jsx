import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Debounce from 'lodash-decorators/debounce';
import { Icon } from 'antd';

import styles from './index.less';

export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };

    render() {
        const { collapsed, isMobile, logo } = this.props;
        return (
            <div className={styles.header}>
                {isMobile && (
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>
                )}
                <span className={styles.trigger} onClick={this.toggle}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </span>
            </div>
        );
    }
}
