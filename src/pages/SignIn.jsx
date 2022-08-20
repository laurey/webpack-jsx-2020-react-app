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
    const { form, layout = 'inline', onSubmit } = props;
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
        <Form layout={layout} onSubmit={handleSubmit}>
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
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
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
                        placeholder="Password"
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
                dispatch({
                    type: 'LOG_IN',
                    payload: {
                        ...data,
                        currentAuthority: _.isEqual(values, { username: 'admin', password: 'admin888' })
                            ? ['admin', 'user']
                            : 'user'
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
