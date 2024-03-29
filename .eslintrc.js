module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    plugins: ['import', 'react', 'react-hooks', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    rules: {
        'no-unused-vars': 1,
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
        'react/no-children-prop': 'warn',
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
