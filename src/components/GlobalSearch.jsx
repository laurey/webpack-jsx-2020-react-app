import React, { memo, forwardRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

export const GlobalSearch = props => {
    const { allowClear, placeholder, forwardedRef, onSearch, onChange } = props;
    const [searchTxt, setSearchTxt] = useState('');

    const handleSearchInputChange = useCallback(
        e => {
            const { value } = e.target;
            setSearchTxt(value);
            onChange(value);
        },
        [onChange]
    );

    return (
        <Search
            ref={forwardedRef}
            value={searchTxt}
            allowClear={allowClear}
            placeholder={placeholder}
            style={{ width: 200, marginRight: 10 }}
            onSearch={onSearch}
            onChange={handleSearchInputChange}
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

export const MemoizedGlobalSearch = memo(GlobalSearchInput);
