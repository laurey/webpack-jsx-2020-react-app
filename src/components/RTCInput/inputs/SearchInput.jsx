import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

export const SearchInput = props => {
    const { onChange, value: valueInProps } = props;
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

    return <Search style={{ width: 200, marginRight: 10 }} {...props} value={value} onChange={handleChange} />;
};

SearchInput.propTypes = {
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func
};

export default SearchInput;
