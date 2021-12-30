import React, { Component } from 'react';
import EditableContext from '@/components/EditableTable/context';

class EditableRow extends Component {
    render() {
        const { form, index, ...rest } = this.props;
        return (
            <EditableContext.Provider value={form}>
                <td {...rest} />
            </EditableContext.Provider>
        );
    }
}

export default EditableRow;
