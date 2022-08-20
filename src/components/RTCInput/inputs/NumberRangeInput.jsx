/**
 * @file
 * @description
 * @author
 */

import React, { useState, useCallback } from 'react';
import { InputNumber } from 'antd';

function NumberRangeInput(props) {
    const {
        onChange,
        forwardedRef,
        defaultValue,
        value: valueInProps,
        minProps = { min: 1, max: 100, step: 1 },
        maxProps = { min: 10, max: 200, step: 1 }
    } = props;
    const [value, setValue] = useState(valueInProps || defaultValue);

    const triggerChange = useCallback(
        ({ min, max }) => {
            let val = [];
            if (typeof min === 'undefined') {
                val = [value[0], max];
            } else if (typeof max === 'undefined') {
                val = [min, value[1]];
            }
            setValue(val);
            if (onChange) {
                onChange(val);
            }
        },
        [onChange, value]
    );

    const handleMinChange = useCallback(
        val => {
            const number = parseInt(val || 0, 10);
            if (isNaN(number)) {
                return;
            }
            triggerChange({ min: number });
        },
        [triggerChange]
    );

    const handleMaxChange = useCallback(
        val => {
            const number = parseInt(val || 0, 10);
            if (isNaN(number)) {
                return;
            }
            triggerChange({ max: number });
        },
        [triggerChange]
    );

    return (
        <div ref={forwardedRef}>
            <InputNumber key="min" {...minProps} value={value[0]} onChange={handleMinChange} />
            <span style={{ padding: '0 10px' }}>-</span>
            <InputNumber key="max" {...maxProps} value={value[1]} onChange={handleMaxChange} />
        </div>
    );
}

export default NumberRangeInput;
