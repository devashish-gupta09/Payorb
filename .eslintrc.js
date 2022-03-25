module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "plugin:import/react",
    "plugin:import/warnings",
    "plugin:import/errors",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "import", "unused-imports", "autofix"],
  rules: {
    "import/no-unresolved": [
      2,
      {
        commonjs: true,
        amd: true,
      },
    ],
    "import/named": 0,
    "import/namespace": 0,
    "import/default": 2,
    "import/export": 2,
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "builtin", // Built-in types are first
          ["sibling", "parent"], // Then sibling and parent types. They can be mingled together
          "index", // Then the index file
          "object",
          // Then the rest: internal and external type
        ],
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "autofix/no-debugger": "error",
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
};
