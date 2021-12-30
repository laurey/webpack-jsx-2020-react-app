import React, { Component } from 'react';
import { Table } from 'antd';
import EditableCell from '../EditableCell';
import EditableContext from './context';

class EditableTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { columns, dataSource, form, ...rest } = this.props;
        const components = {
            body: {
                cell: EditableCell
            }
        };

        return (
            <EditableContext.Provider value={form}>
                <Table
                    bordered
                    {...rest}
                    pagination={false}
                    columns={columns}
                    components={components}
                    dataSource={dataSource}
                    rowClassName="editable-row"
                />
            </EditableContext.Provider>
        );
    }
}

export default EditableTable;
