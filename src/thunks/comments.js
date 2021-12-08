import { fetchComments, removeComment } from '@/services/comments';
import * as commentActions from '@/actions/comments';

export const requestComments = param => {
    return dispatch => {
        dispatch(commentActions.requestCommentsBegin());

        return fetchComments(param)
            .then(comments => {
                const processedComments = comments.map(user => ({ ...user, key: user.key || user.id }));
                dispatch(
                    commentActions.requestCommentsSuccess({ data: processedComments, current: param.params._page })
                );
            })
            .catch(err => {
                dispatch(commentActions.requestCommentsFailure(err.message.toString()));
            });
    };
};

export const deleteComment = param => {
    return dispatch => {
        dispatch(commentActions.deleteCommentBegin());

        removeComment(param)
            .then(data => {
                dispatch(commentActions.deleteCommentSuccess(data));
            })
            .catch(err => {
                dispatch(commentActions.deleteCommentFailure(err.message.toString()));
            });
    };
};
