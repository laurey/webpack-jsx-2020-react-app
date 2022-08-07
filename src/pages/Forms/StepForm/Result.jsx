import React from 'react';
import { Row, Col } from 'antd';

class Step3 extends React.PureComponent {
    render() {
        return (
            <Row type="flex" justify="center">
                <Col>
                    <div style={{ marginTop: 24 }}>
                        <span>success</span>
                        <p>操作成功</p>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Step3;
