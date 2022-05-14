import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import HeaderFormTableInput from '@/components/RTCInput/HeaderFormTableInput';
import { getRandomString, getRandomIntInclusive } from '@/utils';

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

const EnhancedTable = props => {
    const { value = [], columns, onChange } = props;

    return <HeaderFormTableInput columns={columns} value={value} onChange={onChange} />;
};

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
            <EnhancedTable columns={columns} value={dataSource} onChange={handleChange} />
        </div>
    );
};

export default About;
