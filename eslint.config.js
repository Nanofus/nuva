import ts from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...ts.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
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
      'svelte/no-navigation-without-resolve': [
        'error',
        {
          ignoreLinks: true,
        }
      ],
      'svelte/no-at-html-tags': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'indent': ['error', 2],
      'svelte/indent': 'error',
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
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
