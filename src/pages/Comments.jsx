import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { axios } from '@/utils/request';
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

class CommentsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRefreshData = e => {
        e.preventDefault();
        // this.fetchData({
        //     pagination: this.state.pagination
        // });
    };

    handleAbortRequestData = e => {
        e.preventDefault();
        const source = this.cancelTokenRef;
        source.cancel('abort request data!!!');
        this.cancelTokenRef = axios.CancelToken.source();
    };

    handleSearchInputChange = val => {
        // eslint-disable-next-line no-console
        console.log('input.val: ', val);
    };

    handleSearch = value => {
        this.fetchData({
            pagination: this.state.pagination,
            ...(value ? { name_like: value } : null)
        });
    };

    render() {
        return (
            <div style={{ padding: 12 }}>
                <CommentList rowKey="id" columns={columns} />
            </div>
        );
    }
}

CommentsPage.propTypes = {
    comments: PropTypes.array
};

export default CommentsPage;
