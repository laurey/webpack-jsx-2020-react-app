import { getPosts } from '@/services/posts';
import * as postActions from '@/actions/posts';

export const fetchPosts = param => {
    return dispatch => {
        dispatch(postActions.requestPosts());

        getPosts(param)
            .then(posts => {
                dispatch(postActions.receivePosts(posts));
            })
            .catch(err => {
                dispatch(postActions.setPostsError(err.message.toString()));
            });
    };
};
