import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import ParamFormTableInput from '@/components/RTCInput/ParamFormTableInput';
import { MAX_COUNT, hasDuplicates, isValidParams, convertToValue, colsExample } from '@/utils';
import styles from './style.less';
import { SAVESTEPFORMDATA } from '@/constants';

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

@connect(({ form }) => ({
    data: form?.step
}))
@Form.create()
class Step1 extends React.PureComponent {
    handleClick = () => {
        const { form, history, dispatch } = this.props;
        const { validateFields } = form;

        validateFields((err, values) => {
            if (!err) {
                console.log(JSON.stringify({ values }));
                // save step data
                // change route path
                dispatch({
                    type: SAVESTEPFORMDATA,
                    payload: values
                });
                history.push('/form/step-form/confirm');
            }
        });
    };

    render() {
        const { form, data, columns = colsExample } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form layout="horizontal" className={styles.stepForm}>
                <Form.Item {...formItemLayout} label="名称">
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [
                            { required: true, message: '请选择名称' },
                            { max: 20, message: '最大20字符' }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="描述">
                    {getFieldDecorator('description', {
                        initialValue: data.description,
                        rules: [
                            { required: true, message: '请输入描述' },
                            { max: 200, message: '最大200字符' }
                        ]
                    })(<Input.TextArea placeholder="请输入描述" rows={5} />)}
                </Form.Item>
                <Form.Item label="參數1" {...formItemLayout}>
                    {getFieldDecorator('pairs', {
                        initialValue: data.pairs,
                        rules: [
                            {
                                required: true,
                                type: 'array',
                                message: 'Please input your pairs'
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
                    })(<ParamFormTableInput columns={columns} />)}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: {
                            span: formItemLayout.wrapperCol.span,
                            offset: formItemLayout.labelCol.span
                        }
                    }}
                    label=""
                >
                    <Button type="primary" onClick={this.handleClick}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Step1;
