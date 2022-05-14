import React from 'react';
import { Form } from 'antd';

const TBodyRow = ({
    type,
    index,
    record,
    rowIndex,
    children,
    onChange,
    // rules,
    // dataIndex,
    // fieldId,
    // editing,
    // record,
    // inputType,
    ...props
}) => <tr {...props}>{children}</tr>;

export const EditableFormRow = Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(allValues);
        }
    }
})(TBodyRow);

export default TBodyRow;
