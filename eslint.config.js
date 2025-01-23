import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-console': 'warn',
      'no-alert': 'warn',
      'default-case': 'error',
      'dot-notation': 'error',
      'no-var': 'error',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-empty-function': 'off',
      'no-unused-expressions': 'error',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
];
