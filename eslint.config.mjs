import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/generated/prisma/**", // <-- ignore Prisma output
      "**/.next/**", // Next build artefacts
      "**/out/**", // Static export folder
      "**/dist/**", // Other TS build outputs
      "**/coverage/**", // Test coverage
      "**/node_modules/**", // Dependencies
      "**/*.config.js", // Config files you don’t lint
      "**/*.config.mjs",
      "**/*.config.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
