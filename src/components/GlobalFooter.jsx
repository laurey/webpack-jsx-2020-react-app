import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function GlobalFooter({ copyright, children, className }) {
    return (
        <Footer style={{ textAlign: 'center' }} className={className}>
            {children || copyright}
        </Footer>
    );
}

export default GlobalFooter;
