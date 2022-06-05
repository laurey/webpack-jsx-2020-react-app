import { parse } from 'qs';

export const MAX_COUNT = 6;

export const PARAMETER_PATTERN = /^[a-zA-Z0-9-_]{1,50}$/;

export const isValidParams = value => value && PARAMETER_PATTERN.test(value);

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
            key: i,
            names: key,
            values: values[i]
        });
        return acc;
    }, []);
}

export function convertToDataSource(data = {}) {
    const dataSource = [];
    let i = 0;
    for (const [key, value] of Object.entries(data)) {
        dataSource.push({
            key: i,
            names: key,
            values: value
        });
        i++;
    }

    return dataSource;
}

export function convertToValue(dataSource = []) {
    return dataSource.reduce((acc, data) => {
        acc[data.names] = data.values;
        return acc;
    }, {});
}

export function convertDataSourceToValues(dataSource = []) {
    return dataSource.reduce((acc, data, index) => {
        Object.assign(acc, {
            [`names.${index}`]: data.names,
            [`values.${index}`]: data.values
        });
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
                required: true,
                message: 'names is required'
            },
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

export const pairsToDataSource = data => {
    const dataSource = [];
    let i = 0;
    for (const [key, value] of Object.entries(data)) {
        dataSource.push({
            key: i,
            names: key,
            values: value
        });
        i++;
    }

    return dataSource;
};

export const getRandomString = length => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
};

export const hasDuplicates = data => {
    const set = new Set(data);
    return set.size !== data.length;
};

export const combineDataList = result => {
    let data = [];
    if (result && Array.isArray(result.names)) {
        data = result.names.reduce((acc, key, i) => {
            acc.push({
                key: i,
                names: key,
                values: result.values[i]
            });
            return acc;
        }, data);
    }

    return data;
};

export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
