import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { DECREMENT, INCREMENT } from '@/constants/CounterActionTypes';
import styles from './Counter.css';
import { asyncDecrement } from '@/thunks/counter';

const { btn } = styles;

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }

    increment = e => {
        e.preventDefault();
        this.setState(prev => ({ ...prev, value: prev.value + 1 }));
    };

    decrement = () => {
        this.setState(prev => ({ ...prev, value: prev.value - 1 }));
    };

    handleIncrement = () => {
        this.props.dispatch({
            type: INCREMENT
        });
    };

    handleDecrement = () => {
        this.props.dispatch({
            type: DECREMENT
        });
    };

    handleDelayDecrement = () => {
        this.props.dispatch(asyncDecrement(2000));
    };

    render() {
        return (
            <div>
                <div>
                    <span>Counter value: {this.state.value} </span>
                    <Button htmlType="button" className={btn} onClick={this.increment}>
                        Increment-State
                    </Button>
                    <Button htmlType="button" className={btn} onClick={this.decrement}>
                        Decrement-State
                    </Button>
                </div>
                <div style={{ marginTop: 24 }}>
                    <span>Store-Counter-value: {this.props.value} </span>
                    <Button htmlType="button" className={btn} onClick={this.handleIncrement}>
                        inc-store-state
                    </Button>
                    <Button htmlType="button" className={btn} onClick={this.handleDecrement}>
                        dec-store-state
                    </Button>
                    <Button htmlType="button" className={btn} onClick={this.handleDelayDecrement}>
                        desc after 2 seconds
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ...ownProps) => ({
    ...ownProps,
    value: state.counter.value
});

export default connect(mapStateToProps)(Counter);