import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  // external: ["express"],
  target: "es2022",
  sourcemap: true,
  minify: "terser",
  terserOptions: {
    compress: true,
  },
  entry: {
    index: "./src/index.ts",
  },
  outDir: "./dist/api/",
  minifyWhitespace: true,
});
