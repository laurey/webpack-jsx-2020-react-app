import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

export class GlobalSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    handleSearchInputChange = e => {
        const { value } = e.target;
        this.setState({ value });
        this.props.onChange(value);
    };

    render() {
        const { allowClear, placeholder, forwardedRef, onSearch } = this.props;

        return (
            <Search
                ref={forwardedRef}
                value={this.state.value}
                allowClear={allowClear}
                placeholder={placeholder}
                style={{ width: 200, marginRight: 10 }}
                onSearch={onSearch}
                onChange={this.handleSearchInputChange}
            />
        );
    }
}

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
