import React, { PureComponent } from 'react';
import EditableContext from '@/components/EditableRowFormTable/EditableTable/context';

class EditableRow extends PureComponent {
    render() {
        const { form, index, onChange, ...rest } = this.props;
        return (
            <EditableContext.Provider value={form}>
                <tr {...rest} />
            </EditableContext.Provider>
        );
    }
}

export default EditableRow;
