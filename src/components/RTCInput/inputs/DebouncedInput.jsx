import React, { useState, useEffect, useMemo } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

export const DebouncedInput = props => {
    const { onChange, time = 200, value: valueInProps, ...rest } = props;
    const [value, setValue] = useState(() => valueInProps);

    const handleChange = useMemo(() => debounce(onChange, time), [onChange, time]);

    const handleInputChange = e => {
        const { value } = e.target;
        setValue(value);
        handleChange(value);
    };

    useEffect(() => {
        setValue(valueInProps);
    }, [valueInProps]);

    return <Input {...rest} value={value} onChange={handleInputChange} />;
};

DebouncedInput.defaultProps = {
    time: 200
};

export default DebouncedInput;
