import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-axios",
  input: "http://localhost:5000/docs-json",
  output: { path: "api", format: "prettier", lint: "eslint" },
  types: { enums: "typescript" },
  plugins: ["@tanstack/vue-query"],
});
