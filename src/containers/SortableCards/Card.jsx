import React, { Component } from 'react';
import { Card } from 'antd';

class SortCard extends Component {
    render() {
        const { title, content, children, extra, dragging } = this.props;
        const style = {};
        if (dragging) {
            Object.assign(style, {
                border: '1px dashed red'
            });
        }

        return (
            <Card title={title} bordered={false} extra={extra} style={style}>
                <p>{content || children || 'Card content'}</p>
                {/* <p>{dragging && 'dragging!!!!!'}</p> */}
            </Card>
        );
    }
}

export default SortCard;
