/** @type {import('eslint').FlatConfig} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      globals: {
        // Add global variables here if needed
        browser: true,
        es2021: true,
      },
    },
    plugins: [],
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
    },
  },
];
