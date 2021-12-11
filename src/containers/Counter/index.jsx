import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { DECREMENT, INCREMENT } from '@/constants/CounterActionTypes';
import { asyncDecrement } from '@/thunks/counter';
import styles from './Counter.css';

const { btn } = styles;

export const Counter = props => {
    const [value, setValue] = React.useState(0);

    const increment = e => {
        e.preventDefault();
        setValue(prev => prev + 1);
    };

    const decrement = () => {
        setValue(prev => prev - 1);
    };

    const handleIncrement = () => {
        props.dispatch({
            type: INCREMENT
        });
    };

    const handleDecrement = () => {
        props.dispatch({
            type: DECREMENT
        });
    };

    const handleDelayDecrement = () => {
        props.dispatch(asyncDecrement(2000));
    };

    return (
        <div>
            <div>
                <span>Counter value: {value} </span>
                <Button htmlType="button" className={btn} onClick={increment}>
                    Increment-State
                </Button>
                <Button htmlType="button" className={btn} onClick={decrement}>
                    Decrement-State
                </Button>
            </div>
            <div style={{ marginTop: 24 }}>
                <span>Store-Counter-value: {props.value} </span>
                <Button htmlType="button" className={btn} onClick={handleIncrement}>
                    inc-store-state
                </Button>
                <Button htmlType="button" className={btn} onClick={handleDecrement}>
                    dec-store-state
                </Button>
                <Button htmlType="button" className={btn} onClick={handleDelayDecrement}>
                    dec after 2 seconds
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ...ownProps) => ({
    ...ownProps,
    value: state.counter.value
});

export default connect(mapStateToProps)(Counter);
