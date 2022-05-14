import React, { PureComponent } from 'react';
import _ from 'lodash';
// import { combineKeyValueToDatasource } from '@/utils';
// import TBodyRow from './TBodyRow';
import THeaderTable from './THeaderTable';
import TBodyCell from './TBodyCell';
import THeaderCell from './THeaderCell';

class HeaderFormTableInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: this.props.columns || [],
            data: this.props.value || []
        };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.value, this.props.value)) {
            this.setState(
                {
                    data: this.props.value || []
                },
                () => {
                    this.triggerChange();
                }
            );
        }
    }

    triggerChange = () => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
            const value = this.state.data;
            onChange(value);
        }
    };

    handleColumnTypeChange = (index, type) => {
        const newColumns = [...this.state.columns];
        const col = newColumns[index];
        if (index > -1 && col) {
            const row = {
                ...col,
                type
            };

            newColumns.splice(index, 1, row);
            this.setState({ columns: newColumns }, this.triggerChange);
        }
    };

    components = {
        header: {
            cell: THeaderCell
        },
        body: {
            // row: TBodyRow,
            cell: TBodyCell
        }
    };

    render() {
        const columns = this.state.columns.map((col, index) => {
            const data = {};
            const key = col.key || col.dataIndex;

            Object.assign(data, {
                key,
                onHeaderCell: column => ({
                    type: column.type,
                    onTypeChange: type => this.handleColumnTypeChange(index, type)
                }),
                onCell: (record, rowIndex) => ({
                    index,
                    record,
                    rowIndex,
                    type: col.type,
                    title: col.title,
                    dataIndex: col.dataIndex
                })
            });

            return {
                ...col,
                ...data
            };
        });

        return <THeaderTable columns={columns} components={this.components} dataSource={this.state.data} />;
    }
}

export default HeaderFormTableInput;
