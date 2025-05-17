// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname polyfill voor ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compat-laag voor legacy shareable configs
const compat = new FlatCompat({ baseDirectory: __dirname });

// Benoemde export in plaats van anonieme default-export
const config = [
  // **1. Exclude build/output folders**
  { ignores: ["node_modules", ".next", "dist"] },

  // **2. Next.js regels**
  ...compat.extends("next"),
  ...compat.extends("next/core-web-vitals"),

  // **3. Prettier shareable config**
  ...compat.extends("prettier"),

  // **4. Eigen overrides**
  {
    rules: {
      // voorbeeld: waarschuwing ipv error voor console.logs
      // "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export { config };
export default config;
