import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { Spin, Empty } from 'antd';

import styles from './style.module.less';

function RCIframe(props) {
    const { onLoad, url, className, iframeClass, style, children } = props;
    const [loading, setLoading] = useState(!url);
    const [loaded, setLoaded] = useState(false);

    const handleLoad = useCallback(
        e => {
            if (typeof onLoad === 'function') {
                onLoad(e);
            }

            setLoading(false);
            setLoaded(true);
        },
        [onLoad]
    );

    return (
        <div className={classNames(styles.container, className)} style={style}>
            {children}
            {url && loading && <Spin spinning={loading} />}
            {url ? (
                <iframe src={url} className={classNames(styles.iframe, iframeClass)} onLoad={handleLoad} />
            ) : (
                <Empty description="no data!!!" />
            )}
        </div>
    );
}

export default RCIframe;
