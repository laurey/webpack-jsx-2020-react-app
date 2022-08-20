import React from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { Card, Row, Col } from 'antd';
import { ControlledInput } from '@/components/RTCInput/inputs/ControlledInput';
import { DebouncedInput } from '@/components/RTCInput/inputs/DebouncedInput';
import { getPageQuery } from '@/utils';

class RateControl extends React.PureComponent {
    constructor(props) {
        super(props);
        const query = getPageQuery();
        this.state = {
            input1: query.name,
            input2: query.title,
            value1: 0,
            value2: 0,
            value: 0
        };
    }

    componentDidUpdate(prevProps) {
        const { location } = prevProps;
        const query = getPageQuery();
        if (this.props.location.search !== location.search) {
            this.setState({ input1: query.name, input2: query.title });
        }
    }

    // Action: code that causes an update to the state when something happens
    handleChange = () => {
        this.setState(prev => ({ ...prev, value1: prev.value1 + 1 }));
    };

    handleInputChange = () => {
        this.setState(prev => ({ ...prev, value2: prev.value2 + 1 }));
    };

    handleChangeDebounced = debounce(() => {
        this.setState(prev => ({ ...prev, value: prev.value + 1 }));
    }, 200);

    render() {
        return (
            <Row type="flex" gutter={24} justify="space-between">
                <Col span={24}>
                    <ul style={{ display: 'flex', listStyleType: 'number' }}>
                        <li style={{ flex: 1 }}>
                            <Link to="/not-found">not-exist-page</Link>
                        </li>
                        <li style={{ flex: 1 }}>
                            <Link
                                to={{
                                    pathname: '/rateControl',
                                    search: '?name=ratio'
                                }}
                            >
                                rate-control-with-name
                            </Link>
                        </li>
                        <li style={{ flex: 1 }}>
                            <Link
                                to={{
                                    pathname: '/rateControl',
                                    search: '?name=11'
                                }}
                            >
                                rate-control-with-11
                            </Link>
                        </li>
                        <li style={{ flex: 1 }}>
                            <Link
                                to={{
                                    pathname: '/rateControl',
                                    search: '?title=rate-control'
                                }}
                            >
                                rate-control-with-title
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col span={8} style={{ padding: 10 }}>
                    <Card>
                        <h1>UnDebounced Input</h1>
                        <ControlledInput
                            value={this.state.input1}
                            placeholder="input search something"
                            onChange={this.handleChange}
                        />
                        <div>Event fired count: {this.state.value1}</div>
                    </Card>
                </Col>
                <Col span={8} style={{ padding: 10 }}>
                    <Card>
                        <h1>UnDebounced Input With Debounced Callback</h1>
                        <ControlledInput placeholder="input search something" onChange={this.handleChangeDebounced} />
                        <div>Event fired count: {this.state.value}</div>
                    </Card>
                </Col>
                <Col span={8} style={{ padding: 10 }}>
                    <Card>
                        <h1>Debounced Input</h1>
                        <DebouncedInput
                            value={this.state.input2}
                            placeholder="input search something"
                            onChange={this.handleInputChange}
                        />
                        <div>Event fired count: {this.state.value2}</div>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default RateControl;
