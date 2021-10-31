import { INCREMENT, DECREMENT } from '@/constants/CounterActionTypes';

const initialState = {
    value: 0
};

const CounterReducer = (state = initialState, action) => {
    // Check to see if the reducer cares about this action
    if (action.type === INCREMENT) {
        return {
            ...state,
            value: state.value + 1
        };
    } else if (action.type === DECREMENT) {
        return { ...state, value: state.value - 1 };
    }
    // otherwise return the existing state unchanged
    return state;
};

export default CounterReducer;
