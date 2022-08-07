import React from 'react';
import { ConfigProvider } from 'antd';
import defaultLocale from 'antd/lib/locale-provider/zh_CN';

const baseLocaleSeparator = '-';

class LocaleWrapper extends React.Component {
    state = {
        locale: 'zh-CN'
    };

    getAppLocale() {
        let appLocale = {
            locale: 'zh-CN',
            messages: {},
            momentLocale: 'zh-cn'
        };

        window.g_langSeparator = baseLocaleSeparator || '-';
        return appLocale;
    }

    reloadAppLocale = () => {
        const appLocale = this.getAppLocale();
        this.setState({
            locale: appLocale.locale
        });
    };

    render() {
        const appLocale = this.getAppLocale();
        let ret = this.props.children;

        return (
            <ConfigProvider locale={appLocale.antd ? appLocale.antd.default || appLocale.antd : defaultLocale}>
                {ret}
            </ConfigProvider>
        );
    }
}
export default LocaleWrapper;
