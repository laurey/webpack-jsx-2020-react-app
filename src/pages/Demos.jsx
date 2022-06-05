import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import {
    CustomizeForm,
    EhancedParamPairForm,
    EhancedKeyValuePairsForm,
    EhancedParamTableForm
} from '@/containers/FormDemo';
import { getRandomString, pairsToDataSource, colsExample, convertDataSourceToEntries, convertToValue } from '@/utils';

const { TabPane } = Tabs;

const DemosPage = () => {
    const formRef1 = useRef();
    const formRef2 = useRef();
    const formRef3 = useRef();
    const [activeKey, setActiveKey] = useState('1');
    const [kvs, setKvs] = useState({});
    const [pairs, setPairs] = useState({});
    const [dataSource, setDataSource] = useState({});
    const value1 = useMemo(
        () => ({
            params: pairsToDataSource(dataSource),
            pairs: pairsToDataSource(pairs)
        }),
        [dataSource, pairs]
    );
    const value2 = useMemo(
        () => ({
            params: pairsToDataSource(dataSource),
            kv: pairsToDataSource(kvs)
        }),
        [dataSource, kvs]
    );
    const value3 = useMemo(
        () => ({
            pairs: pairsToDataSource(pairs),
            kv: pairsToDataSource(kvs)
        }),
        [kvs, pairs]
    );

    const handleInitData = useCallback(() => {
        setDataSource({
            [getRandomString(2)]: getRandomString(4),
            [getRandomString(3)]: getRandomString(5),
            [getRandomString(4)]: getRandomString(6),
            [getRandomString(5)]: getRandomString(7)
        });
        setPairs({
            [getRandomString(5)]: getRandomString(7),
            [getRandomString(4)]: getRandomString(6),
            [getRandomString(3)]: getRandomString(5),
            [getRandomString(2)]: getRandomString(4)
        });
        setKvs({
            [getRandomString(5)]: getRandomString(7),
            [getRandomString(6)]: getRandomString(6),
            [getRandomString(8)]: getRandomString(8),
            [getRandomString(9)]: getRandomString(5)
        });
    }, []);

    const handleSubmit = useCallback(data => {
        console.log('Received values of form: ', JSON.stringify(data));
    }, []);

    const handleChange = useCallback(key => {
        setActiveKey(key);
        setDataSource({});
        setPairs({});
        setKvs({});
    }, []);

    const handleValueChange = useCallback(values => {
        const { params, kv } = values;
        // setDataSource(convertToValue(params));
        // setKvs(convertToValue(kv));
    }, []);

    // useEffect(() => {
    //     formRef2.current?.form.setFieldsValue(value2);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [value2]);

    return (
        <div style={{ padding: 12 }}>
            <div style={{ marginBottom: 24 }}>
                <Button htmlType="button" className="btn" onClick={handleInitData}>
                    Initial New Value
                </Button>
            </div>
            <Tabs destroyInactiveTabPane defaultActiveKey="1" activeKey={activeKey} onChange={handleChange}>
                <TabPane tab="title 1" key="1">
                    <EhancedParamPairForm
                        value={value1}
                        columns={colsExample}
                        onSubmit={handleSubmit}
                        wrappedComponentRef={formRef1}
                    />
                </TabPane>
                <TabPane tab="Param Table Form" key="2">
                    <EhancedParamTableForm
                        columns={colsExample}
                        onSubmit={handleSubmit}
                        onChange={handleValueChange}
                        wrappedComponentRef={formRef2}
                    />
                </TabPane>
                <TabPane tab="KeyValue Pairs Form" key="3">
                    <EhancedKeyValuePairsForm
                        value={value3}
                        columns={colsExample}
                        onSubmit={handleSubmit}
                        wrappedComponentRef={formRef3}
                    />
                </TabPane>
                <TabPane tab="Customized Form" key="4">
                    <CustomizeForm />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default DemosPage;
