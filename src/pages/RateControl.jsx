import React from 'react';
import { debounce } from 'lodash';
import { Card, Row, Col } from 'antd';
import RTCInput from '@/components/RTCInput';

const { UnDebouncedInput, DebouncedInput } = RTCInput;

class RateControl extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value1: 0,
            value2: 0,
            value: 0
        };
    }

    // Action: code that causes an update to the state when something happens
    handleUnDebouncedInputChange = () => {
        this.setState(prev => ({ ...prev, value1: prev.value1 + 1 }));
    };

    handleDebouncedInputChange = () => {
        this.setState(prev => ({ ...prev, value2: prev.value2 + 1 }));
    };

    handleDebouncedChange = debounce(() => {
        this.setState(prev => ({ ...prev, value: prev.value + 1 }));
    }, 200);

    render() {
        return (
            <Row type="flex" gutter={24} justify="center">
                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: 400, height: 300 }}>
                        <h1>UnDebounced Input</h1>
                        <UnDebouncedInput
                            placeholder="input search something"
                            onChange={this.handleUnDebouncedInputChange}
                        />
                        <div>Event fired count: {this.state.value1}</div>
                    </Card>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: 400, height: 300 }}>
                        <h1>UnDebounced Input With Debounced Callback</h1>
                        <UnDebouncedInput placeholder="input search something" onChange={this.handleDebouncedChange} />
                        <div>Event fired count: {this.state.value}</div>
                    </Card>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: 400, height: 300 }}>
                        <h1>Debounced Input</h1>
                        <DebouncedInput
                            placeholder="input search something"
                            onChange={this.handleDebouncedInputChange}
                        />
                        <div>Event fired count: {this.state.value2}</div>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default RateControl;
