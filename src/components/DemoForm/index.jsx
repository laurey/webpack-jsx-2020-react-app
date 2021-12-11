import React, { useImperativeHandle, useCallback } from 'react';
import { Form, Button } from 'antd';
import NumberRangeInput from '../RTCInput/NumberRangeInput';

const DemoForm = ({ form, onSubmit }, ref) => {
    useImperativeHandle(ref, () => ({
        form
    }));

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
                    initialValue: [11, 33],
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
