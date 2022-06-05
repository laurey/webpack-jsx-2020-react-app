import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'antd';
import EditableTable from '../EditableTable';

const EditableFormTable = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({ form: props.form }), [props.form]);
    return <EditableTable {...props} />;
});
EditableFormTable.displayName = 'EditableFormTable';

const EnhancedEditableFormTable = Form.create({
    name: 'enhance_editable_form_table',
    onValuesChange: function (props, changedValues, allValues) {
        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(allValues);
        }
    }
})(EditableFormTable);
EnhancedEditableFormTable.displayName = 'EnhancedEditableFormTable';

export { EnhancedEditableFormTable as default };
