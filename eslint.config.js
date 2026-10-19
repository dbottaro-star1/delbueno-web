// ESLint flat config. Run with `npm run lint`.
import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/', '.astro/', 'node_modules/', 'concepts/', 'research/', '**/*.tmp.*'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs['flat/recommended'],
  ...astro.configs['flat/jsx-a11y-recommended'],
  {
    files: ['scripts/**/*.mjs', 'plugins/**/*.mjs', 'security/**/*.mjs', '*.mjs', '*.js'],
    languageOptions: { globals: globals.node },
  },
  { files: ['src/scripts/**/*.ts', 'src/components/**/*.ts'], languageOptions: { globals: globals.browser } },
  {
    rules: {
      // Markup comes from Astro templates or from createElement, never from strings.
      'astro/no-set-html-directive': 'error',
      'no-restricted-properties': [
        'error',
        { property: 'innerHTML', message: 'Build DOM nodes instead of HTML strings.' },
        { property: 'outerHTML', message: 'Build DOM nodes instead of HTML strings.' },
        { property: 'insertAdjacentHTML', message: 'Build DOM nodes instead of HTML strings.' },
      ],
      // Scrollable regions must be keyboard focusable (WCAG 2.1.1), so a labelled region may take tabindex.
      'astro/jsx-a11y/no-noninteractive-tabindex': ['error', { tags: [], roles: ['tabpanel', 'region'] }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // JSON-LD is serialized and escaped in one place.
  { files: ['src/components/JsonLd.astro'], rules: { 'astro/no-set-html-directive': 'off' } },
  // Node tools talk to the terminal.
  { files: ['scripts/**/*.mjs'], rules: { 'no-console': 'off' } },
);
