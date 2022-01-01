import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider } from 'antd';
import { combineDataList, convertDataSourceToEntries } from '@/utils';
import EditableFormTable from './EditableFormTable';
import EditableContext from './EditableTable/context';
import EditableCell from './EditableCell';

const components = {
    body: {
        cell: EditableCell
    }
};
// todos:
// 1. wrappedComponentRef issue
function KeyValuePairsInput(props) {
    const { columns: columnsInProps, onChange, value } = props;
    const formRef = React.createRef();

    const [dataSource, setDataSource] = useState(value || []);

    const genUUID = useCallback(() => {
        return dataSource.length;
    }, [dataSource.length]);

    const triggerChange = useCallback(
        dataSource => {
            if (typeof onChange === 'function') {
                // const value = convertData(dataSource);
                onChange(dataSource);
            }
        },
        [onChange]
    );

    const handleChange = useCallback(
        value => {
            const data = combineDataList(value);
            setDataSource(data);
            triggerChange(data);
        },
        [triggerChange]
    );

    const handleAddRow = useCallback(() => {
        const newData = {
            key: genUUID(),
            names: '',
            values: ''
        };
        setDataSource(prev => {
            const data = [...prev, newData];
            // if (data.length > limit) {
            //   return prev
            // }

            // if (prev.some((value) => !value.names)) {
            //   return prev
            // }

            return data;
        });
        triggerChange([...dataSource, newData]);
    }, [dataSource, genUUID, triggerChange]);

    const handleDeleteRow = useCallback(
        key => {
            const data = convertDataSourceToEntries(dataSource.filter(item => item.key !== key));
            const newDataSource = combineDataList(data);
            triggerChange(newDataSource);
            setDataSource(newDataSource);
        },
        [dataSource, triggerChange]
    );

    const handleSave = useCallback(
        (form, key) => {
            console.log(JSON.stringify(form && form.getFieldsValue()));
            console.log(key);
            console.log(JSON.stringify(formRef.current.form && formRef.current.form.getFieldsValue()));
        },
        [formRef]
    );

    const addBtn = useMemo(
        () => (
            <span className="add-row-btn" onClick={handleAddRow}>
                + Add
            </span>
        ),
        [handleAddRow]
    );

    const locale = useMemo(
        () => ({
            emptyText: addBtn
        }),
        [addBtn]
    );

    const columns = useMemo(() => {
        return columnsInProps.map(col => {
            const data = {};
            const key = col.dataIndex || col.key;
            if (key === 'action') {
                Object.assign(data, {
                    render: (text, record) => {
                        return (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <>
                                            <a onClick={() => handleSave(form, record.key)} style={{ marginRight: 8 }}>
                                                Save
                                            </a>
                                            <Divider type="vertical" />
                                            <a onClick={() => handleDeleteRow(record.key)} style={{ marginRight: 8 }}>
                                                Delete
                                            </a>
                                        </>
                                    )}
                                </EditableContext.Consumer>
                            </span>
                        );
                    }
                });
            } else {
                Object.assign(
                    data,
                    col.editable
                        ? {
                              onCell: (record, index) => ({
                                  record,
                                  index,
                                  editing: true,
                                  rules: col.rules,
                                  title: col.title,
                                  dataIndex: col.dataIndex,
                                  inputType: col.inputType,
                                  fieldId: `${col.dataIndex}.${index}`
                                  // onChange: (e) => handleRowChange(e.target.value, col.dataIndex, index)
                              })
                          }
                        : {}
                );
            }

            return {
                ...col,
                ...data
            };
        });
    }, [columnsInProps, handleDeleteRow, handleSave]);

    useEffect(() => {
        const data = Array.isArray(value) ? value : [];
        setDataSource(data);
    }, [value]);

    return (
        <>
            <EditableFormTable
                key="names"
                locale={locale}
                columns={columns}
                components={components}
                dataSource={dataSource}
                onChange={handleChange}
                wrappedComponentRef={formRef}
            />
            {dataSource.length > 0 && addBtn}
        </>
    );
}

export default KeyValuePairsInput;
