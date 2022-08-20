import React from 'react';
import { Table } from 'antd';

function THeaderTable(props) {
    return <Table bordered {...props} rowClassName="editable-row" />;
}

export default THeaderTable;
