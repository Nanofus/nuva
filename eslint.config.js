import js from '@eslint/js';
import ts from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteConfig from './svelte.config.js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        svelteConfig
      }
    }
  },
  {
    rules: {
      'svelte/no-at-html-tags': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'indent': ['error', 2],
      'svelte/indent': 'error',
      'quotes': ['error', 'single'],
    }
  },
  {
    ignores: [
      'build/',
      '.svelte-kit/',
      'dist/',
      '**/.DS_STORE',
      'node_modules/',
      'public/',
      'static/',
      '.vercel/'
    ]
  }
];
