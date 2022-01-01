import React from 'react';
import { Table } from 'antd';

function EditableTable(props) {
    return <Table bordered pagination={false} {...props} rowClassName="editable-row" />;
}

export default EditableTable;
