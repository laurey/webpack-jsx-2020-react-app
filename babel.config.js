module.exports = api => ({
    presets: [['@babel/preset-env'], '@babel/preset-react'],
    plugins: [
        [
            'transform-react-remove-prop-types',
            {
                removeImport: true
            }
        ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-syntax-dynamic-import',
        // ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ],
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['import', { libraryName: 'antd', style: true }],
        !api.env('production') && 'react-hot-loader/babel'
    ].filter(Boolean)
});
