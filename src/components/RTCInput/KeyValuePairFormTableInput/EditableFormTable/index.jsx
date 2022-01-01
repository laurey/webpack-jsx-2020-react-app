import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'antd';
import EditableTable from '../EditableTable';

const ForwardEditableTable = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({ form: props.form }));
    return <EditableTable {...props} />;
});
ForwardEditableTable.displayName = 'ForwardEditableTable';

const EditableFormTable = Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(allValues);
        }
    }
})(ForwardEditableTable);
EditableFormTable.displayName = 'EditableFormTable';

export default EditableFormTable;
