import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { List } from '@/components/List';
import { SearchInput } from '@/components/SearchInput';
import { setupFetch, getFetchDataParams } from '@/utils';

const MemoizedList = memo(List);
const MemoizedGlobalSearchInput = memo(SearchInput);

const columns = [
    {
        title: '姓名',
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
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Action',
        dataIndex: '',
        render: () => <Button type="link">Remove</Button>
    }
];

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns,
            dataSource: [],
            isLoading: false,
            pagination: {
                current: 1,
                pageSize: 3
            }
        };
    }

    componentDidMount() {
        this.fetchUserData({ pagination: this.state.pagination });
    }

    fetchUserData = (params = {}) => {
        const { pagination: pager } = params;
        this.setState({ isLoading: false });
        setupFetch('https://jsonplaceholder.typicode.com/users', null, getFetchDataParams(params)).then(result => {
            this.setState(prev => ({
                isLoading: false,
                dataSource: result,
                pagination: {
                    ...prev.pagination,
                    ...pager,
                    total: result.totalCount || 123
                }
            }));
        });
    };

    handleTableChange = pager => {
        this.fetchUserData({ pagination: pager });
    };

    handleRefreshData = e => {
        e.preventDefault();
        this.fetchUserData({
            pagination: this.state.pagination
        });
    };

    handleSearchInputChange = val => {
        // eslint-disable-next-line no-console
        console.log('input.val: ', val);
    };

    handleSearch = value => {
        this.fetchUserData({
            pagination: this.state.pagination,
            ...(value ? { name_like: value } : null)
        });
    };

    render() {
        return (
            <div style={{ padding: 12 }}>
                <div className="ta-right" style={{ marginBottom: 20, textAlign: 'right' }}>
                    <MemoizedGlobalSearchInput
                        placeholder="please input something"
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
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

Users.propTypes = {
    persons: PropTypes.array
};

export default Users;
