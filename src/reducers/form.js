import { SAVESTEPFORMDATA, SUBMITSTEPFORM } from '@/constants';

const initialState = {
    step: {
        params: [
            {
                key: 0,
                names: 'aa',
                values: 'aa111'
            }
        ]
    }
};

function formReducer(state = initialState, action) {
    switch (action.type) {
        case SAVESTEPFORMDATA:
            return { ...state, step: { ...state.step, ...action.payload } };
        case SUBMITSTEPFORM:
            return { ...state, step: { ...state.step, ...action.payload } };
        default:
            return state;
    }
}

export default formReducer;
