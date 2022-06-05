import React, { forwardRef } from 'react';
import { InputNumber, Input } from 'antd';

export function CellInput(props) {
    const { inputType, value, onChange } = props;
    if (inputType === 'number') {
        return <InputNumber value={value} onChange={onChange} />;
    }
    return <Input value={value} onChange={onChange} />;
}

export const ForwardCellInput = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <CellInput {...props} />
        </div>
    );
});
