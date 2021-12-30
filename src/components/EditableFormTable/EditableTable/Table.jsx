import React, { PureComponent } from 'react';
import { Table } from 'antd';
import EditableContext from './context';

class EditableTable extends PureComponent {
    render() {
        const { columns, dataSource, form, components, ...rest } = this.props;
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
