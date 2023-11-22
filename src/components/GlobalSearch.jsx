import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;

export const GlobalSearch = props => {
    const { onChange, value: valueInProps, forwardedRef, ...rest } = props;
    const [value, setValue] = useState(valueInProps);

    const handleChange = useCallback(
        e => {
            const { value } = e.target;
            setValue(value);
            if (typeof onChange === 'function') {
                onChange(value);
            }
        },
        [onChange]
    );

    useEffect(() => {
        setValue(valueInProps);
    }, [valueInProps]);

    // useEffect(() => {
    //     if (typeof onChange === 'function') {
    //         onChange(value);
    //     }
    // }, [onChange, value]);

    return (
        <Search
            style={{ width: 200, marginRight: 10 }}
            {...rest}
            value={value}
            ref={forwardedRef}
            onChange={handleChange}
        />
    );
};

export const GlobalSearchInput = forwardRef((props, ref) => {
    return <GlobalSearch {...props} forwardedRef={ref} />;
});
