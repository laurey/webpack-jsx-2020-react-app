import React, { useCallback, forwardRef, useState, useEffect } from 'react';
import { Form, Button, InputNumber } from 'antd';
import RangeInput from '../RTCInput/NumberRangeInput';
import ParameterFormTable from '../ParameterFormTable';
import { convertToDataSource, convertDataSourceToEntries } from '@/utils';

const NumberRangeInput = forwardRef((props, ref) => {
    return <RangeInput {...props} forwardedRef={ref} />;
});

const DemoForm = props => {
    const { form, onSubmit, value = {} } = props;
    const { getFieldDecorator } = form;
    const [params, setParams] = useState(value.params);
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

    useEffect(() => {
        const id = setTimeout(() => {
            setParams(
                convertDataSourceToEntries(
                    convertToDataSource({
                        aa: 11,
                        bb: 22,
                        dd: 'dd4'
                    })
                )
            );
        }, 5000);
        return () => {
            clearTimeout(id);
        };
    }, []);

    return (
        <Form onSubmit={handleSubmit} style={{ maxWidth: 700, padding: 10, background: '#eee' }}>
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
            <Form.Item label="參數">
                {getFieldDecorator('params', {
                    initialValue: params,
                    rules: [
                        {
                            required: true,
                            message: 'should not be empty!!!'
                        }
                    ]
                })(<ParameterFormTable limit={10} scroll={{ y: 240 }} />)}
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
