import React from 'react';
import { Form } from 'antd';
import EditableContext from '../EditableTable/context';

const EditableRow = ({
    form,
    index,
    onChange,
    // rules,
    // dataIndex,
    // fieldId,
    // editing,
    // record,
    // inputType,
    ...props
}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(allValues);
        }
    }
})(EditableRow);

export default EditableFormRow;
