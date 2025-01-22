import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'], // TypeScript ফাইলগুলোতে প্রযোজ্য
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        process: 'readonly', // Node.js গ্লোবাল / process কে গ্লোবাল হিসেবে চিহ্নিত
        console: 'readonly', // console গ্লোবাল
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules, // TypeScript-এর জন্য সুপারিশকৃত রুলস
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-console': 'warn',
      'no-alert': 'warn', // alert, confirm, এবং prompt ব্যবহার করলে সতর্ক করবে
      'default-case': 'error', // switch স্টেটমেন্টে default case থাকা বাধ্যতামূলক
      'dot-notation': 'error', // অব্যবহৃত স্ট্রিং সাবস্ক্রিপশন এড়িয়ে চলুন
      'no-var': 'error', // var ব্যবহার নিষিদ্ধ, const/let ব্যবহার করতে হবে
      'prefer-const': 'error', // যদি সম্ভব হয়, const ব্যবহার করুন
      'no-empty-function': 'off', // খালি ফাংশনের জন্য ESLint ত্রুটি সরানো
      'no-unused-expressions': 'error',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['node_modules', 'dist'], // `ignores` ব্যবহার করে ফোল্ডার বাদ দেওয়া
  },
];
