module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // Basic rules to enforce design system usage
    'react/prop-types': 'warn',
    'react/no-unknown-property': ['error', { ignore: ['sx'] }],
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
