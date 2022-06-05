import React, { useCallback, useEffect, useMemo, useState, forwardRef, useImperativeHandle } from 'react';
import { Divider } from 'antd';
import * as shallowEqual from 'shallowequal';
import { combineDataList, convertDataSourceToEntries, convertDataSourceToValues } from '@/utils';
import EditableFormTable from './EditableFormTable';
import EditableContext from './EditableTable/context';
import EditableCell from './EditableCell';

const components = {
    body: {
        cell: EditableCell
    }
};

function KeyValuePairsInput(props, ref) {
    const { columns: columnsInProps, onChange, value } = props;
    const formRef = React.createRef();

    // const [dataSource, setDataSource] = useState(value || []);
    const dataSource = useMemo(() => value || [], [value]);

    const genUUID = useCallback(() => {
        return dataSource.length;
    }, [dataSource.length]);

    const triggerChange = useCallback(
        values => {
            if (typeof onChange === 'function') {
                onChange(values);
            }
        },
        [onChange]
    );

    const handleChange = useCallback(
        value => {
            const data = combineDataList(value);
            // setDataSource(data);
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
        // setDataSource(prev => {
        //     const data = [...prev, newData];
        //     return data;
        // });
        triggerChange([...dataSource, newData]);
    }, [dataSource, genUUID, triggerChange]);

    const handleDeleteRow = useCallback(
        key => {
            const data = convertDataSourceToEntries(dataSource.filter(item => item.key !== key));
            const newDataSource = combineDataList(data);
            // setDataSource(newDataSource);
            triggerChange(newDataSource);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // useEffect(() => {
    //     const { form } = formRef.current;
    //     if (form) {
    //         const values = convertDataSourceToValues(dataSource);
    //         const { setFieldsValue } = form;
    //         setFieldsValue(values);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dataSource]);

    useImperativeHandle(
        ref,
        () => {
            return props;
        },
        [props]
    );

    return (
        <>
            <EditableFormTable
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

export default forwardRef(KeyValuePairsInput);
