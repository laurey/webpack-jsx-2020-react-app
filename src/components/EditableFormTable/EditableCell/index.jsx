import React, { PureComponent } from 'react';
import { InputNumber, Input, Form } from 'antd';
import EditableContext from '../EditableTable/context';

class EditableCell extends PureComponent {
    getInput = () => {
        const { inputType } = this.props;
        if (inputType === 'number') {
            return <InputNumber />;
        }

        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            rules = [],
            title,
            inputType,
            index,
            fieldId,
            record,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(fieldId, {
                            initialValue: record[dataIndex],
                            rules
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    <div>{children}</div>
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

export default EditableCell;
