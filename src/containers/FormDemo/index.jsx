import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form } from 'antd';
import CustomizeForm from './CustomizeForm';
import ParamPairForm from './ParamPairForm';
import ParamTableForm from './ParamTableForm';
import KeyValuePairsForm from './KeyValuePairsForm';

const ForwardParamPairForm = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            form: props.form
        }),
        [props.form]
    );

    useEffect(() => {
        props.form.setFieldsValue(props.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    return <ParamPairForm {...props} />;
});
export const EhancedParamPairForm = Form.create({ name: 'param_pair_demo_form' })(ForwardParamPairForm);
ForwardParamPairForm.displayName = 'ForwardParamPairForm';

const ForwardParamTableForm = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            form: props.form
        }),
        [props.form]
    );

    // useEffect(() => {
    //     props.form.setFieldsValue(props.value);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [props.value]);

    return <ParamTableForm {...props} />;
});

export const EhancedParamTableForm = Form.create({
    name: 'param_table_demo_form',
    onValuesChange(props, changedValues, allValue) {
        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(allValue);
        }
    }
})(ForwardParamTableForm);
ForwardParamTableForm.displayName = 'ForwardParamTableForm';

const ForwardKeyValuePairsForm = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            form: props.form
        }),
        [props.form]
    );

    useEffect(() => {
        props.form.setFieldsValue(props.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    return <KeyValuePairsForm {...props} />;
});
export const EhancedKeyValuePairsForm = Form.create({
    name: 'key_value_demo_form',
    onValuesChange(props, changedValues, allValue) {
        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(allValue);
        }
    }
})(ForwardKeyValuePairsForm);
ForwardKeyValuePairsForm.displayName = 'ForwardKeyValuePairsForm';

export { CustomizeForm };
