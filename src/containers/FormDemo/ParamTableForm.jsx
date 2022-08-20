import React, { useCallback } from 'react';
import _ from 'lodash';
import { Form, Button, Row, Col } from 'antd';
import { ForwardKeyValuePairsInput } from '@/components/RTCInput/inputs/KeyValuePairsInput';
import KeyValuePairFormTableInput from '@/components/RTCInput/inputs/KeyValuePairFormTableInput';
import { MAX_COUNT, hasDuplicates, isValidParams, convertToValue } from '@/utils';

const ParamTableForm = props => {
    const { form, columns, onSubmit } = props;
    const { getFieldDecorator } = form;

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    const { params, kv } = values;
                    const value = {
                        ...values,
                        params: convertToValue(params),
                        kv: convertToValue(kv)
                    };
                    if (typeof onSubmit === 'function') {
                        onSubmit(value);
                    }
                }
            });
        },
        [form, onSubmit]
    );

    const handleChange = useCallback(value => {
        console.log('change!!!');
    }, []);

    return (
        <Form onSubmit={handleSubmit} style={{ padding: 10, background: '#eee' }}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="參數2" style={{ width: 700 }}>
                        {getFieldDecorator('params', {
                            rules: [
                                {
                                    required: true,
                                    type: 'array',
                                    message: 'Please input your params'
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
                <Col span={12}>
                    <Form.Item label="參數3" style={{ width: '100%' }}>
                        {getFieldDecorator('kv', {
                            rules: [
                                {
                                    required: true,
                                    type: 'array',
                                    message: 'Please input your kvs'
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
                        })(<ForwardKeyValuePairsInput columns={columns} onChange={handleChange} />)}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit Data
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ParamTableForm;
