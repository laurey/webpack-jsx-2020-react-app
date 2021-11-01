import { DECREMENT, INCREMENT, INCREMENT_IF_ODD, INCREMENTBY, DECREMENTBY } from '@/constants/CounterActionTypes';

const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return { ...state, value: state.value + 1 };
        case INCREMENTBY:
            return { ...state, value: state.value + action.payload };
        case DECREMENT:
            return { ...state, value: state.value - 1 };
        case DECREMENTBY:
            return { ...state, value: state.value - action.payload };
        case INCREMENT_IF_ODD:
            return state.value % 2 !== 0 ? { ...state, value: state.value + 1 } : state;
        default:
            return state;
    }
}

export default counterReducer;
