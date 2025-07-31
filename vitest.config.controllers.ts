import { defineConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "./prisma/vitest-environment-prisma/prisma-environment.ts",
    include: ["src/http/controllers/**/*.{test,spec}.ts"],
  },
});
