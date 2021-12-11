import React from 'react';
import { Input } from 'antd';

export class ControlledInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
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

export default ControlledInput;
