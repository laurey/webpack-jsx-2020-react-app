import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Counter from '@/containers/Counter';
import EditableFormTable from '@/components/EditableFormTable/EditableTable';
import EditableCell from '@/components/EditableFormTable/EditableCell';
import { colsExample } from '@/utils';

const CounterPage = props => {
    const ref = useRef();
    const handleChange = useCallback(aa => {
        console.log('aa');
        console.log(aa);
    }, []);

    const components = useMemo(
        () => ({
            body: {
                cell: EditableCell
            }
        }),
        []
    );

    const handleSubmit = useCallback(() => {
        const form = ref.current;
        if (form) {
            console.log(JSON.stringify({ vv: form.getFieldsValue() }));
        }
    }, []);

    const handleAddRow = useCallback(() => {}, []);

    const locale = useMemo(
        () => ({
            emptyText: <span onClick={handleAddRow}>+ add</span>
        }),
        [handleAddRow]
    );

    return (
        <div>
            <div>props.value: {props.value}</div>
            <div>you are on the counter page!!!</div>
            <Counter />
            <EditableFormTable
                style={{ width: 600 }}
                scroll={{ y: 240 }}
                ref={ref}
                locale={locale}
                columns={colsExample}
                components={components}
                onChange={handleChange}
            />
            <Button type="primary" onClick={handleSubmit}>
                Click
            </Button>
        </div>
    );
};

CounterPage.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CounterPage;
