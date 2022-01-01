import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import Counter from '@/containers/Counter';
import DynamicForm from '@/containers/DemoForm';
import { colsExample, getRandomString, pairsToDataSource } from '@/utils';

const WrappedDynamicForm = Form.create({ name: 'dynamic_rule' })(DynamicForm);

const CounterPage = props => {
    const [pairs, setPairs] = useState({});
    const [dataSource, setDataSource] = useState({});
    const value = useMemo(
        () => ({
            params: pairsToDataSource(dataSource),
            pairs: pairsToDataSource(pairs),
            kv: pairsToDataSource(pairs)
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
    }, []);

    return (
        <div>
            <div>props.value: {props.value}</div>
            <div>you are on the counter page!!!</div>
            <Counter />
            <div>
                <h3>Editable Table Row Demo</h3>
                <Button htmlType="button" className="btn" onClick={handleInitData}>
                    Initial New Value
                </Button>
                <WrappedDynamicForm limit={10} columns={colsExample} value={value} />
            </div>
        </div>
    );
};

CounterPage.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CounterPage;
