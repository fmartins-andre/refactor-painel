import pluginJs from '@eslint/js'
import pluginRouter from '@tanstack/eslint-plugin-router'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['src/routeTree.gen.ts'] },
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  ...pluginRouter.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    rules: {
      'react/prop-types': 'warn',
      'no-explicit-any': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn', // or "error"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]
