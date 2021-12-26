import React, { useCallback, forwardRef } from 'react';
import { Form, Button, InputNumber } from 'antd';
import RangeInput from '../RTCInput/NumberRangeInput';

const NumberRangeInput = forwardRef((props, ref) => {
    return <RangeInput {...props} forwardedRef={ref} />;
});

const DemoForm = props => {
    const { form, onSubmit } = props;
    const { getFieldDecorator } = form;
    const checkNumber = useCallback((rule, value, callback) => {
        if (Array.isArray(value)) {
            if (value[0] > value[1]) {
                return callback('value[0] must be less or equal than value[1]!');
            }

            return callback();
        }
        callback('Price must be a range!');
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item label="Price">
                {getFieldDecorator('price', {
                    initialValue: 11
                })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="Range">
                {getFieldDecorator('range', {
                    initialValue: [10, 33],
                    rules: [{ validator: checkNumber }]
                })(<NumberRangeInput />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DemoForm;
