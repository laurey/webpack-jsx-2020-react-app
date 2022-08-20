import React, { PureComponent, createRef } from 'react';
import _ from 'lodash';
import { Form, Input, InputNumber } from 'antd';
import EditableContext from '../EditableTable/context';

class EditableCell extends PureComponent {
    constructor(props) {
        super(props);
        this.formRef = createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { record, dataIndex, fieldId } = this.props;
        const { setFieldsValue } = this.formRef.current;
        if (!_.isEqual(record, prevProps.record)) {
            setFieldsValue({
                [fieldId]: record[dataIndex]
            });
        }
    }

    getInput = () => {
        const { inputType } = this.props;
        if (inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = form => {
        this.formRef.current = form;
        const { getFieldDecorator } = form;
        const {
            editing,
            dataIndex,
            record,
            rules,
            title,
            inputType,
            index,
            fieldId,
            children,
            ...restProps
        } = this.props;

        const initialValue = editing && record[dataIndex];

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(fieldId, {
                            rules,
                            initialValue
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    <div className="readonly-td-cell-text">{children}</div>
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

export default EditableCell;
