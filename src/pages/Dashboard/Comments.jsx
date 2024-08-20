import React from 'react';
import { Button } from 'antd';
import ConnectedCommentList from '@/containers/Comments';

const columns = [
    {
        title: '标题1',
        dataIndex: 'id',
        width: '20%'
        // render: text => <span>{text?.substring(0, 15)}...</span>
    },
    {
        title: '内容2',
        dataIndex: 'body',
        width: '20%',
        render: text => <span>{text?.substring(0, 30)}...</span>
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Action',
        dataIndex: '',
        render: () => <Button type="link">Delete</Button>
    }
];

const CommentsPage = () => {
    return (
        <div style={{ padding: 12 }}>
            <ConnectedCommentList columns={columns} />
        </div>
    );
};

export default CommentsPage;
