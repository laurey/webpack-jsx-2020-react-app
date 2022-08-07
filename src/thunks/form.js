import * as formActions from '@/actions/form';
import history from '@/config/history';

export const submitStepForm = param => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        }).then(() => {
            dispatch(formActions.submitStepForm(param));
            history.push('/form/step-form/result');
        });
    };
};
