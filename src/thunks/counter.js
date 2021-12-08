import { increment, decrement } from '@/actions/counter';

export const asyncIncrement = () => dispatch => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    }).then(() => {
        dispatch(increment());
    });
};

export const asyncDecrement = (delay = 1000) => dispatch => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    }).then(() => {
        dispatch(decrement());
    });
};
