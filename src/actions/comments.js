import {
    EDIT_COMMENT,
    FETCH_COMPLETE,
    CANCEL_FETCH_REQUESTED,
    FETCH_REQUESTED,
    FETCH_ERROR,
    DELETE_REQUESTED,
    DELETE_COMPLETE,
    DELETE_ERROR
} from '@/constants/CommentsActionTypes';

// DELETE COMMENT
export const deleteCommentBegin = id => ({
    type: DELETE_REQUESTED,
    payload: id
});
export const deleteCommentSuccess = data => ({
    type: DELETE_COMPLETE,
    payload: data
});
export const deleteCommentFailure = error => ({
    type: DELETE_ERROR,
    payload: error
});

export const editComment = ({ id, data }) => ({
    type: EDIT_COMMENT,
    payload: {
        id,
        data
    }
});

// FETCH COMMENTS
export function requestCommentsBegin() {
    return {
        type: FETCH_REQUESTED
    };
}

export function requestCommentsSuccess({ data, current }) {
    return {
        type: FETCH_COMPLETE,
        payload: {
            current,
            response: data,
            total: data && data.length ? 101 : 20,
            receivedAt: Date.now()
        }
    };
}

export function requestCommentsFailure(error) {
    return {
        type: FETCH_ERROR,
        payload: error
    };
}

export const cancelRequestComments = params => {
    return {
        type: CANCEL_FETCH_REQUESTED,
        payload: params
    };
};
