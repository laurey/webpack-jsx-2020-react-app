import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Input, Tooltip, Icon } from 'antd';
import HeaderFormTableInput from '@/components/RTCInput/inputs/HeaderFormTableInput';
import { getRandomString, getRandomIntInclusive } from '@/utils';
import horseSvg from '@/assets/horse.svg';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        type: 'text'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        type: 'int'
    },
    {
        title: 'Address',
        dataIndex: 'addr',
        type: 'text'
    },
    {
        title: 'C1',
        dataIndex: 'c1',
        type: 'text'
    },
    {
        title: 'C2',
        dataIndex: 'c2',
        type: 'text'
    },
    {
        title: 'C3',
        dataIndex: 'c3',
        type: 'int'
    },
    {
        title: 'City',
        dataIndex: 'city',
        type: 'text'
    },
    {
        title: 'C7',
        dataIndex: 'c7',
        type: 'int'
    },
    {
        title: 'C9',
        dataIndex: 'c9',
        type: 'text'
    },
    {
        title: 'Zip',
        dataIndex: 'zip',
        type: 'text'
    }
];

const dataGenerator = (length = 8) => {
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push({
            key: i,
            name: `Yee ${i}`,
            age: getRandomIntInclusive(10, 88),
            c1: getRandomIntInclusive(200, 260) + '',
            c2: getRandomString(8),
            c3: getRandomIntInclusive(300, 330),
            c7: getRandomIntInclusive(500, 550),
            c9: getRandomIntInclusive(600, 666) + '',
            zip: getRandomIntInclusive(1000000, 9999999),
            city: `Tai. ${i}`,
            addr: `London. ${i}`,
            code: getRandomString(19)
        });
    }
    return data;
};

const AboutForm = props => {
    const { form, onSubmit, value = [], columns } = props;
    const { getFieldDecorator, setFieldsValue } = form;

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    if (typeof onSubmit === 'function') {
                        onSubmit(values);
                    }
                    console.log('Received values of form: ', JSON.stringify(values));
                }
            });
        },
        [form, onSubmit]
    );

    useEffect(() => {
        setFieldsValue({
            kv: value
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Form onSubmit={handleSubmit} style={{ padding: 10, background: '#eee' }}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label={
                            <span>
                                Nickname&nbsp;
                                <Tooltip title="Wu?">
                                    <Icon component={horseSvg} />
                                </Tooltip>
                            </span>
                        }
                        style={{ width: '100%' }}
                    >
                        {getFieldDecorator('nickname', {
                            initialValue: value,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your name'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="table-3" style={{ width: '100%' }}>
                        {getFieldDecorator('kv', {
                            initialValue: value,
                            rules: [
                                {
                                    required: true,
                                    type: 'array',
                                    message: 'Please input your pairs'
                                }
                            ]
                        })(<HeaderFormTableInput columns={columns} />)}
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

const EnhancedForm = Form.create({
    name: 'header_form_table',
    onValuesChange(props, changedValues, allValues) {
        if (typeof props.onChange === 'function') {
            props.onChange(allValues);
        }
    }
})(AboutForm);

const About = props => {
    const [dataSource, setDataSource] = useState(props.value || []);

    const handleInitData = useCallback(() => {
        setDataSource(dataGenerator(getRandomIntInclusive(5, 16)));
    }, []);

    const handleChange = useCallback(value => {
        console.log('new value!!!');
        console.log(JSON.stringify(value));
    }, []);

    return (
        <div>
            <Button htmlType="button" className="btn" onClick={handleInitData}>
                Initial New Value
            </Button>
            <EnhancedForm columns={columns} value={dataSource} onChange={handleChange} />
        </div>
    );
};

export default About;
