import { FETCH_ERROR, FETCH_COMPLETE, FETCH_REQUESTED } from '@/constants/CommentsActionTypes';

const initialState = {
    loading: false,
    error: null,
    total: 0,
    current: 1,
    data: []
};

const CommentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_REQUESTED:
            return { ...state, loading: true, error: null };
        case FETCH_COMPLETE:
            return {
                ...state,
                error: null,
                loading: false,
                current: payload.current,
                data: payload.response,
                total: payload.total
            };
        case FETCH_ERROR:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
};

export default CommentsReducer;
