import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: 'detect',  // Automatically detect the React version
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
];