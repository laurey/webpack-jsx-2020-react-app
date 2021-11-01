import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class UnDebouncedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleInputChange = e => {
        const { value } = e.target;
        this.setState({ value });
        this.props.onChange(value);
    };

    render() {
        const { allowClear, placeholder } = this.props;
        const { value } = this.state;

        return (
            <Input value={value} allowClear={allowClear} placeholder={placeholder} onChange={this.handleInputChange} />
        );
    }
}

class DebouncedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = debounce(props.onChange, props.time || 200);
    }

    handleInputChange = e => {
        const { value } = e.target;
        this.setState({ value });
        this.handleChange(value);
    };

    render() {
        const { allowClear, placeholder } = this.props;
        const { value } = this.state;

        return (
            <Input value={value} allowClear={allowClear} placeholder={placeholder} onChange={this.handleInputChange} />
        );
    }
}

DebouncedInput.defaultProps = {
    time: 200
};

export { UnDebouncedInput, DebouncedInput };
