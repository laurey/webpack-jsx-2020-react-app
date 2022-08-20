import React, { PureComponent } from 'react';
import _ from 'lodash';

class TBodyCell extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            record: props.record
        };
    }

    componentDidUpdate(prevProps) {
        const { record } = this.props;
        if (!_.isEqual(record, prevProps.record)) {
            this.setState(
                {
                    record
                },
                () => {
                    console.log('did update!!!');
                }
            );
        }
    }

    renderCell = () => {
        const { record } = this.state;
        const { dataIndex, title, rowIndex, type, index, children: childrenInProps, ...restProps } = this.props;

        let children = childrenInProps;
        const value = record[dataIndex];
        switch (type) {
            case 'int':
                children = Number(value);
                break;
            case 'text':
                children = String(value);
                break;
            case 'bool':
                children = Boolean(value).valueOf() ? 'true' : 'false';
                break;

            default:
                break;
        }

        return (
            <td {...restProps}>
                [{rowIndex},{index}]/{type}/{children}
            </td>
        );
    };

    render() {
        return this.renderCell();
    }
}

export default TBodyCell;
