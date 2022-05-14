import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Select } from 'antd';

const { Option } = Select;

class THeaderCell extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { type } = this.props;
        if (!_.isEqual(type, prevProps.type)) {
            this.handleChange(type);
        }
    }

    handleChange = type => {
        const { onTypeChange } = this.props;
        this.setState({ type }, () => {
            if (typeof onTypeChange === 'function') {
                onTypeChange(type);
            }
        });
    };

    renderCell = () => {
        const { dataIndex, record, rules, title, index, type, children, onTypeChange, ...restProps } = this.props;

        return (
            <td {...restProps}>
                <div>{children}</div>
                <Select defaultValue="text" value={this.state.type} onChange={this.handleChange}>
                    <Option value="text">text</Option>
                    <Option value="int">int</Option>
                    <Option value="bool">bool</Option>
                </Select>
            </td>
        );
    };

    render() {
        return this.renderCell();
    }
}

export default THeaderCell;
