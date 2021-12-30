import { parse } from 'qs';
import { v4 as uuidv4 } from 'uuid';

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

export const processFetchParams = ({ params, ...rest }) => {
    // eslint-disable-next-line no-unused-vars
    const { total, pageSize, current, filters, ...restParams } = params;
    return {
        params: { ...restParams, ...filters, _limit: pageSize, _page: current },
        ...rest
    };
};

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function combineKeyValue({ names, values }) {
    if (!names || !values) {
        return {};
    }

    return names.reduce((acc, key, i) => {
        acc[key] = values[i];
        return acc;
    }, {});
}

export function convertDataSourceToEntries(dataSource = []) {
    const names = [];
    const values = [];

    return dataSource.reduce(
        (acc, data) => {
            acc.names.push(data.names);
            acc.values.push(data.values);
            return acc;
        },
        { names, values }
    );
}

export function combineKeyValueToDatasource({ names, values } = {}) {
    if (!names || !values) {
        return [];
    }

    return names.reduce((acc, key, i) => {
        acc.push({
            key: uuidv4(),
            names: key,
            values: values[i]
        });
        return acc;
    }, []);
}

export function convertToDataSource(data = {}) {
    const dataSource = [];
    for (const [key, value] of Object.entries(data)) {
        dataSource.push({
            key: uuidv4(),
            names: key,
            values: value
        });
    }

    return dataSource;
}

export function convertToValue(dataSource = []) {
    return dataSource.reduce((acc, data) => {
        acc[data.names] = data.values;
        return acc;
    }, {});
}

export const colsExample = [
    {
        title: 'Names',
        dataIndex: 'names',
        width: 250,
        editing: true,
        editable: true,
        rules: [
            {
                max: 10,
                message: 'max-10-chars'
            }
        ]
    },
    {
        title: 'Values',
        dataIndex: 'values',
        width: 250,
        editing: true,
        editable: true,
        rules: [
            {
                pattern: /^[a-zA-Z0-9_]{1,10}$/,
                message: 'only contains alphnumber and underscore'
            }
        ]
    },
    {
        title: 'Action',
        key: 'action',
        render: () => 'delete'
    }
];
