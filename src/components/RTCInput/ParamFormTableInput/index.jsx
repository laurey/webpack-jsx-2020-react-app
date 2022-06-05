import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Divider } from 'antd';
import { combineKeyValueToDatasource } from '@/utils';
import EditableContext from './EditableTable/context';
import EditableFormTable from './EditableTable';
import EditableFormRow from './EditableRow';
import EditableCell from './EditableCell';

class ParamFormTableInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.value || []
        };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.value, this.props.value)) {
            this.setState(
                {
                    data: this.props.value || []
                },
                () => {
                    this.triggerChange();
                }
            );
        }
    }

    genUUid = () => {
        // const { prefix = 'params_' } = this.props
        // return _.uniqueId(prefix) || uuidv4()
        return this.state.data.length;
    };

    triggerChange = () => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
            const value = this.state.data;
            onChange(value);
        }
    };

    handleChange = value => {
        const dataSource = combineKeyValueToDatasource(value);
        this.setState({ data: dataSource }, this.triggerChange);
    };

    handleAddRow = () => {
        const newData = {
            names: '',
            values: '',
            key: this.genUUid() || this.state.data.length.toString()
        };
        this.setState(prev => {
            const data = [...prev.data, newData];
            return { ...prev, data };
        }, this.triggerChange);
    };

    handleDeleteRow = key => {
        const newData = [...this.state.data];
        this.setState(
            {
                // data: pairsToDataSource(convertData(newData.filter((item) => key !== item.key)))
                data: newData
                    .filter(item => key !== item.key)
                    .map((item, i) => {
                        return {
                            ...item,
                            key: i
                        };
                    })
            },
            this.triggerChange
        );
    };

    handleRowChange = (value, record) => {
        const newDataSource = [...this.state.data];
        // if (newDataSource.find((item) => item.names === value.names)) {
        //   return
        // }

        const index = newDataSource.findIndex(item => item.key === record.key);
        if (index > -1) {
            const row = {
                ...record,
                ...value
            };

            newDataSource.splice(index, 1, row);
            this.setState({ data: newDataSource }, this.triggerChange);
        }
    };

    handleOnRow = (record, index) => ({
        index,
        onChange: value => this.handleRowChange(value, record)
    });

    handleSave(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }

            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
            } else {
                newData.push(row);
            }

            this.setState({ data: newData }, () => {
                console.log(form && form.getFieldsValue());
                console.log(key);
            });
        });
    }

    render() {
        const addBtn = (
            <span className="add-row-btn" onClick={this.handleAddRow}>
                + Add Row
            </span>
        );

        const locale = {
            emptyText: () => addBtn
        };

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };

        const columns = this.props.columns.map(col => {
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
                                            <a
                                                onClick={() => this.handleSave(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Save
                                            </a>
                                            <Divider type="vertical" />
                                            <a
                                                onClick={() => this.handleDeleteRow(record.key)}
                                                style={{ marginRight: 8 }}
                                            >
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
                              onCell: (record, rowIndex) => ({
                                  record,
                                  index: rowIndex,
                                  title: col.title,
                                  inputType: col.inputType,
                                  dataIndex: col.dataIndex,
                                  editing: col.editing,
                                  rules: col.rules
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

        return (
            <>
                <EditableFormTable
                    locale={locale}
                    columns={columns}
                    components={components}
                    dataSource={this.state.data}
                    onRow={this.handleOnRow}
                />
                {this.state.data.length > 0 && addBtn}
            </>
        );
    }
}

export default ParamFormTableInput;
