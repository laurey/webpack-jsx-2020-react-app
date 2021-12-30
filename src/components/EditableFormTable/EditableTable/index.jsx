import { Form } from 'antd';
import EditableTable from './Table';

const EditableFormTable = Form.create({
    onValuesChange: function (props, changedValues, allValues) {
        if (typeof props.onChange === 'function') {
            props.onChange(allValues);
        }
    }
})(EditableTable);

export default EditableFormTable;
