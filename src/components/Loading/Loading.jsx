import React from 'react';
import './style.less';

export default function LoadingPage(props) {
    console.log('loading!!!!');
    return (
        <div className="spinner-container">
            <div className="spinner">{props.children}</div>
        </div>
    );
}
