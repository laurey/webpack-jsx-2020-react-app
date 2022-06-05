import React, { useState } from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider as Provider } from 'antd';

function useLocale() {
    const [locale, setLocale] = useState(null);
    const updateLocale = data => {
        setLocale(data);
    };

    return {
        locale,
        updateLocale
    };
}

function LocaleProvider({ children }) {
    const { locale: loc } = useLocale();
    let locale;
    if (loc === 'cn') {
        locale = zhCN;
    }

    return <Provider locale={locale}>{children}</Provider>;
}

export default LocaleProvider;
