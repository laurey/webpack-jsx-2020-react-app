import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Button, Spin } from 'antd';
import { List } from '@/components/List';
import { SearchInput } from '@/components/RTCInput/inputs/SearchInput';
import { processFetchParams, getPageQuery } from '@/utils';
import { cancelRequestComments } from '@/actions/comments';
import { deleteComment, requestComments } from '@/thunks/comments';
import { axios } from '@/utils/request';
import styles from './styles.less';

const MemoizedList = memo(List);
const MemoizedGlobalSearchInput = memo(SearchInput);

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        const query = getPageQuery();

        this.state = {
            isLoading: false,
            rowKey: props.rowKey,
            columns: props.columns || [],
            dataSource: props.comments || [],
            pagination: {
                total: props.total || 0,
                current: props.current || 1,
                pageSize: props.pageSize || 3
            },
            filters: query
        };
        this.cancelTokenRef = axios.CancelToken.source();
    }

    componentDidMount() {
        this.fetchData({ params: { ...this.state.filters, ...this.state.pagination } });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments !== this.props.comments) {
            this.setState({ dataSource: this.props.comments });
        }

        if (prevProps.rowKey !== this.props.rowKey) {
            this.setState({ rowKey: this.props.rowKey });
        }

        if (prevProps.filters !== this.props.filters) {
            this.setState(prev => ({ ...prev, filters: { ...prev.filters, ...this.props.filters } }));
        }

        // if (prevProps.pagination !== this.props.pagination) {
        //     this.setState(prev => ({ ...prev, pagination: { ...prev.pagination, ...this.props.pagination } }));
        // }

        if (prevProps.total !== this.props.total) {
            this.setState(prev => ({ ...prev, pagination: { ...prev.pagination, total: this.props.total } }));
        }

        if (prevProps.current !== this.props.current) {
            this.setState(prev => ({ ...prev, pagination: { ...prev.pagination, current: this.props.current } }));
        }

        if (prevProps.pageSize !== this.props.pageSize) {
            this.setState(prev => ({ ...prev, pagination: { ...prev.pagination, pageSize: this.props.pageSize } }));
        }
    }

    componentWillUnmount() {
        const source = this.cancelTokenRef;
        source.cancel('request cancelled by user!!!');
    }

    fetchData = params => {
        const source = this.cancelTokenRef;
        this.props.onFetchComments(processFetchParams({ ...params, cancelToken: source.token })).finally(() => {
            this.cancelTokenRef = axios.CancelToken.source();
        });
    };

    handleTableChange = pager => {
        this.fetchData({ params: { ...this.state.filters, ...this.state.pagination, ...pager } });
    };

    handleRefreshData = e => {
        e.preventDefault();
        this.fetchData({
            params: {
                ...this.state.pagination,
                ...this.state.filters
            }
        });
    };

    handleSearchInputChange = value => {
        const query = value ? { name_like: value } : null;
        this.setState(prev => {
            if (!value) {
                delete prev.filters.name_like;
            }

            return {
                ...prev,
                filters: { ...prev.filters, ...query }
            };
        });
    };

    handleSearch = () => {
        this.setState(
            prev => ({
                ...prev,
                pagination: { ...prev.pagination, current: 1 }
            }),
            () => {
                this.fetchData({
                    params: {
                        ...this.state.pagination,
                        ...this.state.filters
                    }
                });
            }
        );
    };

    handleAbortRequest = e => {
        e.preventDefault();
        const source = this.cancelTokenRef;
        source.cancel('abort request data!!!');
        this.cancelTokenRef = axios.CancelToken.source();
    };

    render() {
        return (
            <>
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
                        className={classNames('rtc-toolbar-btn rtc-btn', styles.toolbarBtn)}
                        onClick={this.handleRefreshData}
                    />
                    <Button
                        icon="fire"
                        title="Abort"
                        shape="circle"
                        htmlType="button"
                        className={classNames('rtc-toolbar-btn rtc-btn', styles.toolbarBtn)}
                        onClick={this.handleAbortRequest}
                    />
                </div>
                <Spin spinning={this.props.loading}>
                    <MemoizedList
                        rowKey={this.state.rowKey}
                        columns={this.state.columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.isLoading}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                    />
                </Spin>
            </>
        );
    }
}

CommentList.propTypes = {
    className: PropTypes.any,
    columns: PropTypes.arrayOf(PropTypes.object),
    comments: PropTypes.arrayOf(PropTypes.object),
    onFetchComments: PropTypes.func.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    onCancelFetchComments: PropTypes.func.isRequired
};

const mapStateToProps = ({ comments }) => ({
    total: comments.total,
    current: comments.current,
    loading: comments.loading,
    error: comments.error,
    comments: comments.data
});

const mapDispatchToProps = dispatch => ({
    onCancelFetchComments: () => dispatch(cancelRequestComments()),
    onFetchComments: data => dispatch(requestComments(data)),
    onDeleteComment: id => dispatch(deleteComment(id))
});

const connectedCommentList = connect(mapStateToProps, mapDispatchToProps)(CommentList);

export default connectedCommentList;
