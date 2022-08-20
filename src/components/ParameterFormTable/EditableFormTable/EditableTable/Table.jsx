import React, { PureComponent } from 'react';
import { Table } from 'antd';
import EditableContext from './context';

class EditableTable extends PureComponent {
    render() {
        const { form, ...rest } = this.props;
        return (
            <EditableContext.Provider value={form}>
                <Table bordered pagination={false} {...rest} rowClassName="editable-row" />
            </EditableContext.Provider>
        );
    }
}

export default EditableTable;
