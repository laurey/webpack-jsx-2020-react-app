import React, { Component } from 'react';
import { InputNumber, Input, Form } from 'antd';
import EditableContext from '../EditableTable/context';

class EditableCell extends Component {
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
            title,
            rules = [],
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
                            rules: [
                                ...rules,
                                {
                                    required: true,
                                    message: `Please ${record[dataIndex]} Input ${title}!`
                                }
                            ]
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

export default EditableCell;
