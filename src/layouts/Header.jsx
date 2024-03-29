import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends React.PureComponent {
    state = {
        visible: true
    };

    static getDerivedStateFromProps(props, state) {
        if (!props.autoHideHeader && !state.visible) {
            return {
                visible: true
            };
        }
        return null;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handScroll, { passive: true });
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handScroll);
    }

    getHeadWidth = () => {
        const { isMobile, collapsed, setting } = this.props;
        const { fixedHeader, layout } = setting;
        if (isMobile || !fixedHeader || layout === 'topmenu') {
            return '100%';
        }
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    };

    handleMenuClick = ({ key }) => {
        const { dispatch } = this.props;
        if (key === 'usersetting') {
            // history.push('/account/settings/base');
            return;
        }
        if (key === 'logout') {
            dispatch({
                type: 'login/logout'
            });
        }
    };

    handScroll = () => {
        const { autoHideHeader } = this.props;
        const { visible } = this.state;
        if (!autoHideHeader) {
            return;
        }

        const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                if (this.oldScrollTop > scrollTop) {
                    this.setState({
                        visible: true
                    });
                } else if (scrollTop > 300 && visible) {
                    this.setState({
                        visible: false
                    });
                } else if (scrollTop < 300 && !visible) {
                    this.setState({
                        visible: true
                    });
                }
                this.oldScrollTop = scrollTop;
                this.ticking = false;
            });
        }
    };

    render() {
        const { isMobile, handleMenuCollapse, setting } = this.props;
        const { navTheme, layout, fixedHeader } = setting;
        const { visible } = this.state;
        const isTop = layout === 'topmenu';
        const width = this.getHeadWidth();

        return (
            <Fragment>
                {visible ? (
                    <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
                        {isTop && !isMobile ? (
                            <TopNavHeader
                                theme={navTheme}
                                mode="horizontal"
                                onCollapse={handleMenuCollapse}
                                onNoticeClear={this.handleNoticeClear}
                                onMenuClick={this.handleMenuClick}
                                onNoticeVisibleChange={this.handleNoticeVisibleChange}
                                {...this.props}
                            />
                        ) : (
                            <GlobalHeader
                                onCollapse={handleMenuCollapse}
                                onNoticeClear={this.handleNoticeClear}
                                onMenuClick={this.handleMenuClick}
                                onNoticeVisibleChange={this.handleNoticeVisibleChange}
                                {...this.props}
                            />
                        )}
                    </Header>
                ) : null}
            </Fragment>
        );
    }
}

HeaderView.propTypes = {
    collapsed: PropTypes.bool
};

export default connect(({ global, setting }) => ({
    setting,
    collapsed: global.collapsed
}))(HeaderView);
