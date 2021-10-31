module.exports = {
    plugins: [
        ['postcss-import'],
        ['postcss-preset-env', { browsers: ['> 10%', 'not ie 11', 'not op_mini all'] }],
        ['autoprefixer'],
        [
            'cssnano',
            {
                preset: ['default', { discardComments: true }]
            }
        ]
    ]
};
