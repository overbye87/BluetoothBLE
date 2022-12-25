module.exports = {
  root: true,
  extends: ['airbnb'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'import/no-unresolved': 'off',
        'no-use-before-define': 'off',
        'arrow-body-style': 'off',
        'linebreak-style': 'off',
        'no-unused-vars': ['warn', { vars: 'local', args: 'after-used', ignoreRestSiblings: false }],
        'react/no-unused-prop-types': 'warn',
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
          },
        ],
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'import/extensions': ['error', 'ignorePackages', {
          js: 'never', jsx: 'never', ts: 'never', tsx: 'never',
        },
        ],
        'react/destructuring-assignment': [0, 'always', { ignoreClassFields: true, destructureInSignature: 'ignore' }],
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'implicit-arrow-linebreak': [0, 'warn', 'beside'],
      },
      settings: {
        'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
      },
    },
  ],
};
