// eslint.config.mjs
import prettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';


export default [
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: typescriptParser,
    },
    plugins: {
      prettier,
      jest,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'no-console': 'error',
      'prettier/prettier': 'error',
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'no-constant-binary-expression': 'error',
      'no-sequences': 'error',
    },
  },
];