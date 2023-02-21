import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  if (env.mode == "development") {
    return { plugins: [vue()] };
  }
  return {
    plugins: [vue(), dts({ include: "./src", exclude: "./src/vite-env.d.ts" })],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, "src/index.ts"),
        name: "VirtualList",
        fileName: "vue-virtual-list",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
          exports: "named",
        },
      },
    },
  };
});
