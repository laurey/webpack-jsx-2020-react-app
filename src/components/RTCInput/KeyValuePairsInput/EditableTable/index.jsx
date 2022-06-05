import React from 'react';
import { Table } from 'antd';
import EditableContext from './context';

function EditableTable(props) {
    const { form, ...rest } = props;

    return (
        <EditableContext.Provider value={form}>
            <Table bordered pagination={false} rowClassName="editable-row" {...rest} />
        </EditableContext.Provider>
    );
}

export default EditableTable;
