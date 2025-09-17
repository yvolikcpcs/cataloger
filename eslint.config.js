// eslint.config.js (Flat config)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
  { ignores: ['dist', 'build', 'node_modules', 'prettier.config.cjs'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true
      }
    },
    plugins: { react, prettier },
    settings: { react: { version: 'detect' } },
    rules: {
      'prettier/prettier': 'error'
    }
  }
];
