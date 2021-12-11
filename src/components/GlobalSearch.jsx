import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

export const GlobalSearch = props => {
    const { onChange, value: valueInProps, forwardedRef, ...rest } = props;
    const [value, setValue] = useState(valueInProps);

    const handleChange = useCallback(e => {
        const { value } = e.target;
        setValue(value);
        // onChange(value);
    }, []);

    useEffect(() => {
        setValue(valueInProps);
    }, [valueInProps]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(value);
        }
    }, [onChange, value]);

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

GlobalSearch.propTypes = {
    forwardedRef: PropTypes.any,
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func.isRequired
};

export const GlobalSearchInput = forwardRef((props, ref) => {
    return <GlobalSearch {...props} forwardedRef={ref} />;
});

GlobalSearchInput.propTypes = {
    placeholder: PropTypes.string,
    allowClear: PropTypes.bool,
    onSearch: PropTypes.func,
    onChange: PropTypes.func
};
