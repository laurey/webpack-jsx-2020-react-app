import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import _ from 'lodash';
import { List } from '@/components/List';
import { SearchInput } from '@/components/SearchInput';
import { processFetchParams } from '@/utils';
import { fetchUsers } from '@/services/users';

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

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        filters: {},
        pagination: {
            current: 1,
            pageSize: 3
        }
    });
    const [state, setState] = useState({
        columns,
        dataSource: []
    });

    const fetchUserData = useCallback(
        (params = {}) => {
            if (isLoading) {
                return;
            }

            const { pagination: pager, ...rest } = params;

            setIsLoading(true);
            fetchUsers(
                processFetchParams({ params: { ...filters.filters, ...filters.pagination, ...pager, ...rest } })
            ).then(result => {
                setFilters(prev => ({
                    ...prev,
                    pagination: {
                        ...prev.pagination,
                        ...pager,
                        total: result.totalCount || 123
                    }
                }));
                setState(prev => ({
                    ...prev,
                    dataSource: result
                }));
                setIsLoading(false);
            });
        },
        [filters.filters, filters.pagination, isLoading]
    );

    const handleTableChange = pager => {
        fetchUserData({ pagination: pager });
    };

    const handleRefreshData = e => {
        e.preventDefault();
        fetchUserData();
    };

    const handleInputChange = value => {
        const query = value ? { name_like: value } : null;
        setFilters(prev => {
            if (!value) {
                delete prev.filters.name_like;
            }

            return {
                ...prev,
                filters: { ...prev.filters, ...query }
            };
        });
    };

    const handleSearchInputChange = useMemo(() => _.debounce(handleInputChange, 400), []);

    const handleSearch = value => {
        fetchUserData({
            pagination: { ...filters.pagination, current: 1 },
            ...(value ? { name_like: value } : null)
        });
    };

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('aaa');

    return (
        <div style={{ padding: 12 }}>
            <div className="ta-right" style={{ marginBottom: 20, textAlign: 'right' }}>
                <MemoizedGlobalSearchInput
                    placeholder="please input something"
                    onSearch={handleSearch}
                    onChange={handleSearchInputChange}
                />
                <Button htmlType="button" shape="circle" icon="reload" title="Reload" onClick={handleRefreshData} />
            </div>
            <MemoizedList
                rowKey="id"
                columns={state.columns}
                dataSource={state.dataSource}
                loading={isLoading}
                pagination={filters.pagination}
                onChange={handleTableChange}
            />
        </div>
    );
};

Users.propTypes = {
    persons: PropTypes.array
};

export default Users;
