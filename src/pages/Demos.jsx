import React, { useCallback, useState, useMemo, useRef } from 'react';
import { Tabs, Button, Row, Col } from 'antd';
import {
    CustomizeForm,
    EhancedParamPairForm,
    EhancedKeyValuePairsForm,
    EhancedParamTableForm
} from '@/containers/FormDemo';
import { getRandomString, pairsToDataSource, colsExample } from '@/utils';

const { TabPane } = Tabs;

const DemosPage = () => {
    const formRef1 = useRef();
    const formRef2 = useRef();
    const formRef3 = useRef();
    const [activeKey, setActiveKey] = useState('1');
    const [kvs, setKvs] = useState({});
    const [pairs, setPairs] = useState({});
    const [dataSource, setDataSource] = useState({});
    const [value, setValue] = useState({
        pairs: pairsToDataSource(pairs),
        kv: pairsToDataSource(kvs)
    });
    const value1 = useMemo(
        () => ({
            params: pairsToDataSource(dataSource),
            pairs: pairsToDataSource(pairs)
        }),
        [dataSource, pairs]
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

    const handleInitValue = useCallback(() => {
        const pairs = {
            [getRandomString(5)]: getRandomString(7),
            [getRandomString(4)]: getRandomString(6),
            [getRandomString(3)]: getRandomString(5),
            [getRandomString(2)]: getRandomString(4)
        };
        const kvs = {
            [getRandomString(2)]: getRandomString(5),
            [getRandomString(6)]: getRandomString(6),
            [getRandomString(3)]: getRandomString(2),
            [getRandomString(7)]: getRandomString(3)
        };

        setValue({
            pairs: pairsToDataSource(pairs),
            kv: pairsToDataSource(kvs)
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

    return (
        <div style={{ padding: 12 }}>
            <div>
                <Row type="flex" gutter={24} style={{ marginBottom: 24 }}>
                    {activeKey === '1' && (
                        <Col>
                            <Button htmlType="button" className="btn" onClick={handleInitData}>
                                Initial Tab 1 Form Value
                            </Button>
                        </Col>
                    )}
                    {/* <Col>
                        <Button htmlType="button" className="btn" onClick={handleInitData}>
                            Initial Tab 2 Form Value
                        </Button>
                    </Col> */}
                    {activeKey === '3' && (
                        <Col>
                            <Button htmlType="button" className="btn" onClick={handleInitValue}>
                                Initial Tab 3 Form Value
                            </Button>
                        </Col>
                    )}
                </Row>
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
                        value={value}
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
