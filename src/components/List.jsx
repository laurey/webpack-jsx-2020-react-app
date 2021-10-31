import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

export function List(props) {
    const { columns, dataSource, pagination, loading, onChange } = props;
    const handleTableChange = params => {
        onChange(params);
    };

    return (
        <div>
            <Table
                bordered
                columns={columns}
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}

List.propTypes = {
    onChange: PropTypes.func,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired
};

export const MemoizedList = memo(List);
