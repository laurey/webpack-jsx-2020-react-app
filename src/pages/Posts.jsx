import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { List } from '@/components/List';
import { GlobalSearchInput } from '@/components/GlobalSearch';
import { setupFetch, getFetchDataParams } from '@/utils';

const MemoizedList = memo(List);
const MemoizedSearchInput = memo(GlobalSearchInput);

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        width: '20%',
        render: text => <span>{text.substring(0, 15)}...</span>
    },
    {
        title: '内容',
        dataIndex: 'body',
        width: '20%',
        render: text => <span>{text.substring(0, 30)}...</span>
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

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: false,
            pagination: {
                current: 1,
                pageSize: 3
            }
        };
    }

    componentDidMount() {
        this.fetchPostData({ pagination: this.state.pagination });
    }

    fetchPostData = (params = {}) => {
        const { pagination: pager } = params;
        this.setState({ isLoading: true });
        setupFetch('https://jsonplaceholder.typicode.com/posts', null, getFetchDataParams(params)).then(data => {
            this.setState(prev => ({
                isLoading: false,
                dataSource: data,
                pagination: {
                    ...prev.pagiantion,
                    ...pager,
                    total: data.totalCount || 101
                }
            }));
        });
    };

    handleTableChange = pager => {
        this.fetchPostData({ pagination: pager });
    };

    handleRefreshData = e => {
        e.preventDefault();
        this.fetchPostData({
            pagination: this.state.pagination
        });
    };

    handleSearchInputChange = val => {
        // eslint-disable-next-line no-console
        console.log('val: ', val);
    };

    handleSearch = value => {
        this.fetchPostData({
            pagination: this.state.pagination,
            ...(value ? { title_like: value } : null)
        });
    };

    render() {
        return (
            <div style={{ padding: 12 }}>
                <div className="ta-right" style={{ marginBottom: 20, textAlign: 'right' }}>
                    <MemoizedSearchInput
                        placeholder="please input search text"
                        onSearch={this.handleSearch}
                        onChange={this.handleSearchInputChange}
                    />
                    <Button
                        htmlType="button"
                        shape="circle"
                        icon="reload"
                        title="Reload"
                        onClick={this.handleRefreshData}
                    />
                </div>
                <MemoizedList
                    columns={columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array
};

export default Posts;
