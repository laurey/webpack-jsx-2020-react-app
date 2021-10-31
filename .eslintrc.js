// const path = require('path');

module.exports = {
    // parser: '@babel/eslint-parser',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
            jsx: true
        }
        // requireConfigFile: false,
        // babelOptions: {
        //     configFile: path.resolve(__dirname, './babel.config.js'),
        // },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es2015: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['import', 'react', 'react-hooks', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'import/prefer-default-export': 'off',
        'react/destructuring-assignment': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/forbid-prop-types': 'off',
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
        'jsx-a11y/no-static-element-interactions': [
            'off',
            {
                handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp']
            }
        ]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx']
            }
        },
        react: {
            pragma: 'React',
            version: 'detect'
        }
    }
};
