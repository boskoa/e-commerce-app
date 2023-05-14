module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:cypress/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react", "jest", "cypress"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
