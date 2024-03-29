module.exports = api => {
    api.cache(true);

    return {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            // ['@babel/plugin-syntax-decorators', { legacy: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            ['import', { libraryName: 'antd', style: true }]
        ],
        env: {
            production: {
                only: ['src'],
                plugins: [
                    [
                        'transform-react-remove-prop-types',
                        {
                            removeImport: true
                        }
                    ],
                    '@babel/plugin-transform-react-inline-elements',
                    '@babel/plugin-transform-react-constant-elements'
                ]
            }
        }
    };
};
