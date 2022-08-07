const initialState = {
    collapsed: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'UPDATE_COLLAPSED':
            return { ...state, ...payload };

        default:
            return state;
    }
};
