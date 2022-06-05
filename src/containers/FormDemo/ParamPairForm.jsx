import React, { useCallback, forwardRef, useEffect } from 'react';
import _ from 'lodash';
import { Form, Button, InputNumber, Row, Col } from 'antd';
import RangeInput from '@/components/RTCInput/NumberRangeInput';
import ParameterFormTableInput from '@/components/RTCInput/ParamFormTableInput';
import KeyValuePairFormTableInput from '@/components/RTCInput/KeyValuePairFormTableInput';
import { MAX_COUNT, hasDuplicates, isValidParams, convertToValue } from '@/utils';

const NumberRangeInput = forwardRef((props, ref) => {
    return <RangeInput {...props} forwardedRef={ref} />;
});

const ParamPairForm = props => {
    const { form, onSubmit, value = {}, columns, limit } = props;
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

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    const { params, pairs } = values;
                    const value = {
                        ...values,
                        params: convertToValue(params),
                        pairs: convertToValue(pairs)
                    };
                    if (typeof onSubmit === 'function') {
                        onSubmit(value);
                    }
                }
            });
        },
        [form, onSubmit]
    );

    return (
        <Form onSubmit={handleSubmit} style={{ padding: 10, background: '#eee' }}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Price">
                        {getFieldDecorator('price', {
                            initialValue: 11
                        })(<InputNumber />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Range">
                        {getFieldDecorator('range', {
                            initialValue: [10, 33],
                            rules: [{ validator: checkNumber }]
                        })(<NumberRangeInput />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="參數1" style={{ width: 700 }}>
                        {getFieldDecorator('params', {
                            initialValue: value.params,
                            rules: [
                                {
                                    required: true,
                                    type: 'array',
                                    message: 'Please input your params'
                                },
                                {
                                    max: MAX_COUNT,
                                    min: 1,
                                    type: 'array',
                                    message: `参数最多${MAX_COUNT}对`
                                },
                                {
                                    type: 'array',
                                    validator: (rule, value = [], callback) => {
                                        try {
                                            if (hasDuplicates(value.map(({ names }) => names))) {
                                                callback('参数名不允许重复');
                                            }

                                            // if (value.length > MAX_COUNT) {
                                            //   callback(`参数个数最多${MAX_COUNT}`)
                                            // }

                                            if (value.some(item => !item.names)) {
                                                callback('参数名不允许为空');
                                            }

                                            if (value.some(v => !isValidParams(v.names))) {
                                                callback('参数名仅支持字母，数字，下划线，中划线');
                                            }

                                            if (value.some(v => !isValidParams(v.values))) {
                                                callback('参数值仅支持字母，数字，下划线，中划线');
                                            }

                                            const nested = value.some(
                                                p => p && (_.isObject(p.values) || _.isArray(p.values))
                                            );

                                            if (nested) {
                                                callback('参数值不支持数组或对象形式');
                                            }

                                            callback();
                                        } catch (error) {
                                            callback(error);
                                        }
                                    }
                                }
                            ]
                        })(<ParameterFormTableInput columns={columns} limit={limit} />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="參數2" style={{ width: 700 }}>
                        {getFieldDecorator('pairs', {
                            initialValue: value.pairs,
                            rules: [
                                {
                                    required: true,
                                    type: 'array',
                                    message: 'Please input your pairs'
                                },
                                {
                                    min: 1,
                                    max: MAX_COUNT,
                                    type: 'array',
                                    message: `参数最多${MAX_COUNT}对`
                                },
                                {
                                    type: 'array',
                                    validator: (rule, value = [], callback) => {
                                        try {
                                            if (hasDuplicates(value.map(({ names }) => names))) {
                                                callback('参数名不允许重复');
                                            }

                                            if (value.some(item => !item.names)) {
                                                callback('参数名不允许为空');
                                            }

                                            if (value.some(v => !isValidParams(v.names))) {
                                                callback('参数名仅支持字母，数字，下划线，中划线');
                                            }

                                            if (value.some(v => !isValidParams(v.values))) {
                                                callback('参数值仅支持字母，数字，下划线，中划线');
                                            }

                                            const nested = value.some(
                                                p => p && (_.isObject(p.values) || _.isArray(p.values))
                                            );

                                            if (nested) {
                                                callback('参数值不支持数组或对象形式');
                                            }

                                            callback();
                                        } catch (error) {
                                            callback(error);
                                        }
                                    }
                                }
                            ]
                        })(<KeyValuePairFormTableInput columns={columns} />)}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ParamPairForm;
