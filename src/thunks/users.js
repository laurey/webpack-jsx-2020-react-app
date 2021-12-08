import { fetchUsers, removeUser } from '@/services/users';
import * as userActions from '@/actions/users';

export const requestUsers = param => {
    return dispatch => {
        dispatch(userActions.requestUsersBegin());

        return fetchUsers(param)
            .then(users => {
                const processedUsers = users.map(user => ({ ...user, key: user.key || user.id }));
                dispatch(userActions.requestUsersSuccess({ data: processedUsers, current: param.params._page }));
            })
            .catch(err => {
                dispatch(userActions.requestUsersFailure(err.message.toString()));
            });
    };
};

export const deleteUser = param => {
    return dispatch => {
        dispatch(userActions.deleteUserBegin());

        removeUser(param)
            .then(data => {
                dispatch(userActions.deleteUserSuccess(data));
            })
            .catch(err => {
                dispatch(userActions.deleteUserFailure(err.message.toString()));
            });
    };
};
