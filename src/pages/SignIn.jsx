import _ from 'lodash';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import { reloadAuthorized } from '@/utils/Authorized';

const { Item: FormItem } = Form;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function LoginForm(props) {
    const { form, onSubmit } = props;
    const { validateFields, resetFields } = form;

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    onSubmit(values);
                }
            });
        },
        [onSubmit, validateFields]
    );

    const handleReset = useCallback(() => {
        resetFields();
    }, [resetFields]);

    useEffect(() => {
        validateFields();
        return () => {
            handleReset();
        };
    }, [handleReset, validateFields]);

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
        <Form onSubmit={handleSubmit} className="login-form" style={{ maxWidth: 400, padding: 20 }}>
            <FormItem validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                {getFieldDecorator('username', {
                    rules: [
                        { required: true, message: 'Please input your username!' },
                        {
                            min: 2,
                            max: 20,
                            message: 'Min 2, Max 20 letters'
                        }
                    ]
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username: admin or user"
                    />
                )}
            </FormItem>
            <FormItem help={passwordError || ''} validateStatus={passwordError ? 'error' : ''}>
                {getFieldDecorator('password', {
                    rules: [
                        { required: true, message: 'Please input your Password!' },
                        {
                            min: 6,
                            max: 20,
                            message: 'min 6, max 20 letters'
                        }
                    ]
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password: test888"
                    />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Log in
                </Button>
            </FormItem>
        </Form>
    );
}

export const WrappedLoginFormWithRef = Form.create({ name: 'login_ref_form' })(
    forwardRef((props, ref) => {
        useImperativeHandle(ref, () => props.form);

        return <LoginForm {...props} />;
    })
);

export const SignIn = props => {
    const { dispatch, history } = props;
    const formRef = useRef(null);
    const handleSubmit = useCallback(values => {
        Promise.resolve(values)
            .then(data => {
                let authority = null;
                if (_.isEqual(values, { username: 'admin', password: 'test888' })) {
                    authority = ['admin', 'user'];
                } else if (_.isEqual(values, { username: 'user', password: 'test888' })) {
                    authority = 'user';
                }

                dispatch({
                    type: 'LOG_IN',
                    payload: {
                        ...data,
                        currentAuthority: authority
                    }
                });
            })
            .then(() => {
                reloadAuthorized();
                formRef.current.resetFields();
            })
            .then(() => {
                history.push({
                    pathname: '/'
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WrappedLoginFormWithRef
            {...props}
            onSubmit={handleSubmit}
            wrappedComponentRef={formRef} // normal form ref value
        />
    );
};

export default connect()(SignIn);
