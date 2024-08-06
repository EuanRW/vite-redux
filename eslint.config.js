import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended, react.configs.flat.recommended],
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'src/govuk-frontend.min.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...stylistic.configs['recommended-flat'].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "@stylistic/js/brace-style": ["error", "1tbs"]
    },
  })
  