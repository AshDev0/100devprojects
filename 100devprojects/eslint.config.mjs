import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'public/demos/**', 'scripts/**'],
  },
  {
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Apostrophes/quotes in JSX text render fine; escaping legal copy adds noise
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default config;
