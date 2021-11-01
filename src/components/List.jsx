import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

export class List extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTableChange = params => {
        this.props.onChange(params);
    };

    render() {
        const { columns, dataSource, pagination, loading } = this.props;

        return (
            <div>
                <Table
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={dataSource}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

List.propTypes = {
    onChange: PropTypes.func,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired
};

export default List;
