import React, { PureComponent, createRef } from 'react';
import { Button, Divider } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { colsExample, combineKeyValueToDatasource, convertDataSourceToEntries } from '@/utils';
import EditableContext from './EditableFormTable/EditableTable/context';
import EditableFormTable from './EditableFormTable/EditableTable';
import EditableCell from './EditableFormTable/EditableCell';

const components = {
    body: {
        cell: EditableCell
    }
};

class ParameterFormTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: combineKeyValueToDatasource(props.value) || []
        };
        this.formRef = createRef();
    }

    // componentDidUpdate(prevprops, prevstate) {
    //     if (
    //         !_.isEqualWith(this.props.value, prevprops.value, (objValue = {}, othValue = {}) => {
    //             const { key, ...restObj } = objValue;
    //             const { key: _key, ...restOth } = othValue;
    //             return _.isEqual(restObj, restOth);
    //         }) &&
    //         !this.state.data.length
    //     ) {
    //         console.log(JSON.stringify([prevstate.data, this.state.data]));
    //         this.setState({ data: combineKeyValueToDatasource(this.props.value) }, () => {
    //             console.log('value changed & did update');
    //         });
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (_.isEqual(this.props.value, nextProps.value) && _.isEqual(this.state.data, nextState.data)) {
    //         return false;
    //     }

    //     return true;
    // }

    triggerChange = () => {
        const { onChange } = this.props;
        const value = convertDataSourceToEntries(this.state.data);
        // const { current: form } = this.formRef;
        // if (form) {
        //     // form.setFieldsValue(value);
        //     console.log(JSON.stringify({ fv: value }));
        // }

        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    handleChange = value => {
        this.setState({ data: combineKeyValueToDatasource(value) }, this.triggerChange);
    };

    handleAddRow = () => {
        const newData = [...this.state.data];
        const row = {
            key: uuidv4(),
            names: '',
            values: ''
        };
        newData.push(row);
        this.setState({ data: newData }, this.triggerChange);
    };

    handleDeleteRow = (form, key) => {
        const newData = [...this.state.data];
        this.setState(
            {
                data: newData.filter(item => key !== item.key)
            },
            this.triggerChange
        );
    };

    save = () => {};

    render() {
        const { data: dataSource } = this.state;
        const { columns: columnsInProps = colsExample, scroll } = this.props;

        const locale = {
            emptyText: <span onClick={this.handleAddRow}>+ add</span>
        };

        const columns = columnsInProps.map(col => {
            const key = col.key || col.dataIndex;
            if (key === 'action') {
                return {
                    ...col,
                    render: (text, record) => {
                        return (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <span>
                                            <a onClick={() => this.save(form, record.key)} style={{ marginRight: 8 }}>
                                                Save
                                            </a>
                                            <Divider type="vertical" />
                                            <a
                                                onClick={() => this.handleDeleteRow(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Delete
                                            </a>
                                        </span>
                                    )}
                                </EditableContext.Consumer>
                            </span>
                        );
                    }
                };
            }

            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record, index) => ({
                    record,
                    index,
                    rules: col.rules,
                    title: col.title,
                    editing: col.editing,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    fieldId: `${col.dataIndex}.${index}`
                })
            };
        });

        return (
            <div>
                <EditableFormTable
                    style={{ padding: 10 }}
                    scroll={scroll}
                    locale={locale}
                    columns={columns}
                    components={components}
                    dataSource={dataSource}
                    ref={this.formRef}
                    onChange={this.handleChange}
                />
                {dataSource.length > 0 && (
                    <Button type="ghost" htmlType="button" onClick={this.handleAddRow}>
                        add +
                    </Button>
                )}
            </div>
        );
    }
}

export default ParameterFormTable;
