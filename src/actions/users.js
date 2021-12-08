import {
    ADD_USER,
    EDIT_USER,
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
    FETCH_COMPLETE,
    CANCEL_FETCH_REQUESTED,
    FETCH_REQUESTED,
    FETCH_ERROR,
    DELETE_REQUESTED,
    DELETE_COMPLETE,
    DELETE_ERROR
} from '@/constants/UsersActionTypes';
import { getInfo } from '@/services/users';

export const addUser = data => ({
    type: ADD_USER,
    payload: data
});

// DELETE USER
export const deleteUserBegin = id => ({
    type: DELETE_REQUESTED,
    payload: id
});
export const deleteUserSuccess = data => ({
    type: DELETE_COMPLETE,
    payload: data
});
export const deleteUserFailure = error => ({
    type: DELETE_ERROR,
    payload: error
});

export const editUser = ({ id, data }) => ({
    type: EDIT_USER,
    payload: {
        id,
        data
    }
});

// FETCH USERS
export function requestUsersBegin() {
    return {
        type: FETCH_REQUESTED
    };
}

export function requestUsersSuccess({ data, current }) {
    return {
        type: FETCH_COMPLETE,
        payload: {
            current,
            response: data,
            total: data && data.length ? 155 : 10,
            receivedAt: Date.now()
        }
    };
}

export function requestUsersFailure(error) {
    return {
        type: FETCH_ERROR,
        payload: error
    };
}

export const cancelRequestUsers = params => {
    return {
        type: CANCEL_FETCH_REQUESTED,
        payload: params
    };
};

export const getUser = () => dispatch => {
    dispatch({ type: GET_CURRENT_USER });
    return getInfo().then(
        user => dispatch({ type: GET_CURRENT_USER_SUCCESS, user }),
        err => dispatch({ type: GET_CURRENT_USER_FAILURE, err })
    );
};
