import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import CommentList from '@/containers/Comments';

const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        width: '20%',
        render: text => <span>{text.substring(0, 15)}...</span>
    },
    {
        title: '内容',
        dataIndex: 'body',
        width: '20%',
        render: text => <span>{text ? text.substring(0, 30) : '-'}...</span>
    },
    {
        title: '日志',
        dataIndex: 'postId'
    },
    {
        title: 'Action',
        key: 'action',
        render: () => <Button type="link">Remove</Button>
    }
];

const CommentsPage = () => {
    return (
        <div style={{ padding: 12 }}>
            <CommentList rowKey="id" columns={columns} />
        </div>
    );
};

CommentsPage.propTypes = {
    comments: PropTypes.array
};

export default CommentsPage;
