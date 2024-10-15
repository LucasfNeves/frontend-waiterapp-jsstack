import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser, // Parser para arquivos TypeScript
      ecmaVersion: "latest", // Suporte para as features mais recentes
      sourceType: "module", // Usar ESModules
      globals: globals.browser, // Definir os globais do ambiente do navegador
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Plugin do TypeScript
      react: reactPlugin, // Plugin do React
    },
    rules: {
      ...jsPlugin.configs.recommended.rules, // Regras recomendadas do JS
      ...tsPlugin.configs["recommended"].rules, // Regras recomendadas do TypeScript
      ...reactPlugin.configs["flat"].recommended.rules, // Regras recomendadas do React
      "react/react-in-jsx-scope": "off", // Desabilita a necessidade de importar React
    },
  },
];

