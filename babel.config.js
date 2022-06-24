module.exports = api => ({
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        ['import', { libraryName: 'antd', style: true }],
        !api.env('production') && 'react-hot-loader/babel'
    ].filter(Boolean),
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
});
