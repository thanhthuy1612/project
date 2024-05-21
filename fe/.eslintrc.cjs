module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'jsx-a11y': {
            components: {
                PageHeaderText: 'h1',
                HeadingText: 'h1',
                Text: 'h1',
                SecondaryText: 'h1',
                Label: 'label',
                Link: 'a',
                TextField: 'input',
                PrimaryButton: 'button',
                DefaultButton: 'button',
                IconButton: 'button',
            },
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react',
        '@typescript-eslint',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-jsdoc',
        'simple-import-sort',
        'import',
        'jsx-a11y',
    ],
    rules: {
        'react/react-in-jsx-scope': ['off'],
        'no-nested-ternary': 'off',
        'no-empty': 'error',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    [
                        '^react',
                        '^api',
                        // Packages.
                        // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                        '^@?\\w',
                        '^models',
                        '^reduxs',
                        '^utility',
                        '^(@|components)(/.*|$)',
                        "^\\.\\.(?!/?$)', '^\\.\\./?$",
                        '^\\./(?=.*/)(?!/?$)',
                        '^\\.(?!/?$)',
                        '^\\./?$',
                        // Node.js builtins prefixed with `node:`.
                        '^node:',
                        // Absolute imports and other imports such as Vue-style `@/foo`.
                        // Anything not matched in another group.
                        '^',
                        // Relative imports.
                        // Anything that starts with a dot.
                        '^\\.',
                        '^.+\\.?((sa|sc|c)ss)$',
                        '^.+\\.?(css)$',
                    ],
                    // Side effect imports.
                    ['^\\u0000'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/extensions': ['off', 'never'],
        'import/no-unresolved': [
            'off',
            {
                ignore: ['^@', './'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: true,
                peerDependencies: true,
                bundledDependencies: true,
            },
        ],
        'import/prefer-default-export': 'off',
        'max-len': [
            'warn',
            {
                code: 120,
            },
        ],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
                avoidEscape: true,
            },
        ],
    },
};
