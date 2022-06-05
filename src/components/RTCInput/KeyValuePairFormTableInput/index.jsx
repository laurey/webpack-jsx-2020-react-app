import React, { PureComponent } from 'react';
import { Divider } from 'antd';
import _ from 'lodash';
import { combineDataList } from '@/utils';
import EditableFormTable from './EditableFormTable';
import EditableContext from './EditableTable/context';
import EditableCell from './EditableCell';

const components = {
    body: {
        cell: EditableCell
    }
};

class KeyValuePairFormTableInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: props.value || []
        };
        this.formRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.props;
        const data = Array.isArray(value) ? value : [];
        if (!_.isEqual(data, prevState.dataSource)) {
            this.setState({
                dataSource: data
            });
        }
    }

    genUUID = () => {
        return this.state.dataSource.length;
    };

    triggerChange = dataSource => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
            onChange(dataSource);
        }
    };

    handleChange = value => {
        const data = combineDataList(value);
        this.setState({ dataSource: data }, () => {
            this.triggerChange(this.state.dataSource);
        });
    };

    handleAddRow = () => {
        const newData = {
            key: this.genUUID(),
            names: '',
            values: ''
        };
        this.setState(
            prev => {
                const data = [...prev.dataSource, newData];
                return {
                    ...prev,
                    dataSource: data
                };
            },
            () => {
                this.triggerChange(this.state.dataSource);
            }
        );
    };

    handleDeleteRow = key => {
        const newDataSource = this.state.dataSource
            .filter(item => item.key !== key)
            .map((item, i) => {
                return {
                    ...item,
                    key: i
                };
            });
        this.setState({ dataSource: newDataSource }, () => {
            this.triggerChange(this.state.dataSource);
        });
    };

    handleSave = (form, key) => {
        console.log(JSON.stringify(form && form.getFieldsValue()));
        console.log(key);
        console.log(JSON.stringify(this.formRef.current.form && this.formRef.current.form.getFieldsValue()));
    };

    render() {
        const { dataSource } = this.state;
        const { columns: columnsInProps } = this.props;

        const addBtn = (
            <span className="add-row-btn" onClick={this.handleAddRow}>
                + Add
            </span>
        );

        const locale = {
            emptyText: addBtn
        };

        const columns = columnsInProps.map(col => {
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
                              onCell: (record, index) => ({
                                  record,
                                  index,
                                  editing: true,
                                  rules: col.rules,
                                  title: col.title,
                                  dataIndex: col.dataIndex,
                                  inputType: col.inputType,
                                  fieldId: `${col.dataIndex}.${index}`
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
                    dataSource={dataSource}
                    onChange={this.handleChange}
                    wrappedComponentRef={this.formRef}
                />
                {dataSource.length > 0 && addBtn}
            </>
        );
    }
}

export default KeyValuePairFormTableInput;
