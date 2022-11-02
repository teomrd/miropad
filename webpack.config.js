const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  experiments: { asyncWebAssembly: true },
  target: "web",
  mode: "development",
  performance: {
    // we don't want the wasm blob to generate warnings
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "src/assets/favicon.ico",
      hash: true,
      title: `✍️ MiroPad v${require("./package.json").version}`,
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      TITLE_NAME: JSON.stringify("✍️ MiroPad"),
      VERSION: JSON.stringify(require("./package.json").version),
    }),
  ],
};
