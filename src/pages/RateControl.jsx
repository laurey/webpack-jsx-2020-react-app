import React, { useState } from 'react';
import { debounce } from 'lodash';
import { Card, Row, Col } from 'antd';
import RTCInput from '../components/RTCInput';

const { UnDebouncedInput, DebouncedInput } = RTCInput;

function RateControl() {
    const [counter, setCounter] = useState(0);
    const [undebouncedCounter, setUndebouncedCounter] = useState(0);
    const [debouncedCounter, setDebouncedCounter] = useState(0);

    // Action: code that causes an update to the state when something happens
    const handleUnDebouncedInputChange = () => {
        setUndebouncedCounter(prev => prev + 1);
    };

    const handleDebouncedInputChange = () => {
        setDebouncedCounter(prev => prev + 1);
    };

    const handleDebouncedChange = debounce(() => {
        setCounter(prev => prev + 1);
    }, 100);

    // View: the UI definition
    return (
        <Row type="flex" gutter={24} justify="center">
            <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: 400, height: 300 }}>
                    <h1>UnDebounced Input</h1>
                    <UnDebouncedInput placeholder="input search something" onChange={handleUnDebouncedInputChange} />
                    <div>Event fired count: {undebouncedCounter}</div>
                </Card>
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: 400, height: 300 }}>
                    <h1>UnDebounced Input With Debounced Callback</h1>
                    <UnDebouncedInput placeholder="input search something" onChange={handleDebouncedChange} />
                    <div>Event fired count: {counter}</div>
                </Card>
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: 400, height: 300 }}>
                    <h1>Debounced Input</h1>
                    <DebouncedInput placeholder="input search something" onChange={handleDebouncedInputChange} />
                    <div>Event fired count: {debouncedCounter}</div>
                </Card>
            </Col>
        </Row>
    );
}

export default RateControl;
