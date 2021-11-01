import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

export class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleSearchInputChange = e => {
        const { value } = e.target;
        this.setState({ value });
        this.props.onChange(value);
    };

    render() {
        const { allowClear, placeholder, onSearch } = this.props;

        return (
            <Search
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

SearchInput.propTypes = {
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func
};

export default SearchInput;
