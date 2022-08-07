import { setAuthority } from '@/utils/authority';

const initialState = { currentUser: null };

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'LOG_IN':
            setAuthority(payload?.currentAuthority);
            return { ...state, currentUser: { ...state.currentUser, ...payload, lastTime: new Date().getTime() } };

        case 'LOG_OUT':
            setAuthority('guest');
            return { currentUser: null };

        default:
            return state;
    }
};
