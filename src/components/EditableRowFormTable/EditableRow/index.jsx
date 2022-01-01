import { Form } from 'antd';
import EditableRow from './Row';

const EditableFormRow = Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        if (typeof props.onChange === 'function') {
            props.onChange(allValues);
        }
    }
})(EditableRow);

EditableFormRow.displayName = 'EditableFormRow';
export default EditableFormRow;
