module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'linebreak-style': ['error', 'unix'],
        quotes: [2, 'single', 'avoid-escape'],
        'prettier/prettier': ['error', { singleQuote: true, printWidth: 140 }],
        'max-len': [
            'error',
            {
                code: 140,
                ignoreTrailingComments: true,
                ignoreUrls: true,
            },
        ],
    },
};
