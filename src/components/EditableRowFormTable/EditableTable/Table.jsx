import React, { PureComponent } from 'react';
import { Table } from 'antd';

class EditableTable extends PureComponent {
    render() {
        const { columns, dataSource, components, ...rest } = this.props;

        return (
            <Table
                bordered
                {...rest}
                pagination={false}
                columns={columns}
                components={components}
                dataSource={dataSource}
                rowClassName="editable-row"
            />
        );
    }
}

export default EditableTable;
