import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

export const List = props => {
    return <Table bordered {...props} />;
};

List.propTypes = {
    onChange: PropTypes.func,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired
};

export default List;
