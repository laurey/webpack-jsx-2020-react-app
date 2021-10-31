import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { DECREMENT, INCREMENT } from '@/constants/CounterActionTypes';
import styles from './Counter.css';

function Counter() {
    const { value } = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const { btn } = styles;

    // State: a counter value
    const [counter, setCounter] = useState(0);

    // Action: code that causes an update to the state when something happens
    const increment = e => {
        e.preventDefault();
        setCounter(prevCounter => prevCounter + 1);
    };

    const decrement = () => {
        setCounter(prevCounter => prevCounter - 1);
    };

    const handleIncrement = () => {
        dispatch({
            type: INCREMENT
        });
    };

    const handleDecrement = () => {
        dispatch({
            type: DECREMENT
        });
    };

    // View: the UI definition
    return (
        <div>
            <div>
                <span>Counter value: {counter} </span>
                <Button htmlType="button" className={btn} onClick={increment}>
                    Increment-State
                </Button>
                <Button htmlType="button" className={btn} onClick={decrement}>
                    Decrement-State
                </Button>
            </div>
            <div style={{ marginTop: 24 }}>
                <span>Counter value: {value} </span>
                <Button htmlType="button" className={btn} onClick={handleIncrement}>
                    ➕ Store-state
                </Button>
                <Button htmlType="button" className={btn} onClick={handleDecrement}>
                    ➖ Store-state
                </Button>
            </div>
        </div>
    );
}

export default Counter;
