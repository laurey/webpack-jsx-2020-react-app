export const setupFetch = async (path, options, params) => {
    const search = new URLSearchParams(params).toString();
    const url = new URL(path);
    url.search = search;
    const response = await fetch(url.toJSON(), options);
    const data = await response.json();
    return data.map(item => {
        return {
            key: item.key || item.id,
            ...item
        };
    });
};

export const getFetchDataParams = ({ pagination, ...rest }) => ({
    _limit: pagination.pageSize,
    _page: pagination.current,
    ...rest
});
