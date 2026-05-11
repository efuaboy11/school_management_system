// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add a custom override to disable no-explicit-any and adjust other rules
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Listing every context *Function in thousands of useEffect deps is not practical;
      // useCallback already keeps stable identities where it matters.
      "react-hooks/exhaustive-deps": "off",
      // Many pages use dynamic img elements for user-uploaded media; converting is a separate effort.
      "@next/next/no-img-element": "off",
      // optionally: "@typescript-eslint/no-explicit-any": "warn",
      // You can also adjust other rules here as needed:
      // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
