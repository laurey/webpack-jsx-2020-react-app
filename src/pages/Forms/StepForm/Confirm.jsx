import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Select } from 'antd';
import KeyValuePairFormTableInput from '@/components/RTCInput/inputs/KeyValuePairFormTableInput';
import { MAX_COUNT, hasDuplicates, isValidParams, colsExample } from '@/utils';
import { submitStepForm } from '@/thunks/form';
import styles from './style.less';

const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
};

const { Option } = Select;

@connect(({ form }) => ({
    data: form?.step
}))
@Form.create()
class Step2 extends React.PureComponent {
    handleSubmit = e => {
        const { form, data, dispatch, onSubmit } = this.props;
        const { validateFields } = form;
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                if (typeof onSubmit === 'function') {
                    onSubmit({ ...data, ...values });
                }

                dispatch(
                    submitStepForm({
                        ...data,
                        ...values
                    })
                );
            }
        });
    };

    handlePrevBtnClick = () => {
        const { history } = this.props;
        history.push('/form/step-form/info');
    };

    render() {
        const { form, submitting, data, columns = colsExample } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form layout="horizontal" className={styles.stepForm}>
                <Form.Item {...formItemLayout} label="人员">
                    {getFieldDecorator('candidate', {
                        initialValue: data.candidate,
                        rules: [
                            {
                                required: true,
                                message: '人员必选'
                            }
                        ]
                    })(
                        <Select placeholder="Please select one person">
                            <Option value="jacky">Jacky</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="jerry">Jerry</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="參數2" {...formItemLayout}>
                    {getFieldDecorator('params', {
                        initialValue: data.params,
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
                <Form.Item
                    style={{ marginBottom: 8 }}
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: {
                            span: formItemLayout.wrapperCol.span,
                            offset: formItemLayout.labelCol.span
                        }
                    }}
                    label=""
                >
                    <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
                        提交
                    </Button>
                    <Button onClick={this.handlePrevBtnClick} style={{ marginLeft: 8 }}>
                        上一步
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Step2;
