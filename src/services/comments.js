import request from '@/utils/request';
import store from '@/store';

export function fetchComments({ params, ...config }) {
    const state = store.getState();

    console.log('state.services => ', state?.counter);

    return request({
        url: '/api/comments',
        method: 'get',
        params,
        ...config
    });
}

export function getComment({ id, params, ...config }) {
    return request({
        url: '/api/comments/' + id,
        method: 'get',
        params,
        ...config
    });
}

export function updateComment({ id, data, ...config }) {
    return request({
        url: '/api/comments/' + id,
        method: 'post',
        data,
        ...config
    });
}

export function removeComment({ id, data, ...config }) {
    return request({
        url: '/api/comments/' + id,
        method: 'delete',
        data,
        ...config
    });
}
