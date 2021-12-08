import { INCREMENT, INCREMENTBY, DECREMENT, DECREMENTBY } from '@/constants/CounterActionTypes';

export const increment = () => ({ type: INCREMENT });

export const incrementBy = factor => ({
    type: INCREMENTBY,
    payload: { factor }
});

export const decrement = () => ({ type: DECREMENT });

export const decrementBy = factor => ({
    type: DECREMENTBY,
    payload: { factor }
});
