import React, { PureComponent, createRef } from 'react';
import * as shallowEqual from 'shallowequal';
import { Form } from 'antd';
import EditableContext from '../EditableTable/context';
import { ForwardCellInput } from './CellInput';

class EditableCell extends PureComponent {
    constructor(props) {
        super(props);
        this.formRef = createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { record, dataIndex, fieldId } = this.props;
        const { setFieldsValue } = this.formRef.current;
        if (dataIndex) {
            if (!shallowEqual(record[dataIndex], prevProps?.record[dataIndex])) {
                setFieldsValue({
                    [fieldId]: record[dataIndex]
                });
            }
        }
    }

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
                    <Form.Item style={{ margin: 0 }} key={fieldId}>
                        {getFieldDecorator(fieldId, {
                            rules,
                            initialValue
                        })(<ForwardCellInput {...this.props} />)}
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
