module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 'off',
  },
};
