const path = require("path");
const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  optimization: {
    minimize: false, // ease code review by webextension stores
  },
  devtool: false, // related to optimization.minimize=false and https://bugzilla.mozilla.org/show_bug.cgi?id=1437937
  entry: {
    "injectable-content-script": "./src/injectable-content-script.ts",
    "options/main": "./src/options/main.ts",
    "popup/main": "./src/popup/main.ts",
    "background-listeners-setup": "./src/background-listeners-setup.ts",
  },
  output: {
    path: path.resolve(__dirname, "addon"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: "svelte-loader",
          options: {
            preprocess: sveltePreprocess(),
            compilerOptions: {
              dev: false,
            },
            emitCss: false,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".svelte", ".mjs"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditionNames: ["svelte", "browser", "import"],
  },
};
