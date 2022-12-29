const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
const path = require("path");

const buildDate = new Date().toLocaleString();

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log({ isProduction });
  return {
    entry: "./src/index.ts",
    mode: process.env.NODE_ENV || "development",
    devServer: {
      port: 3000,
      open: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [{ loader: "url-loader", options: { limit: 8192 } }],
        },
      ],
    },

    plugins: [
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "container",
        remotes: {
          app1: "app1@http://localhost:3001/remoteEntry.js",
          kisiler: "kisiler@http://localhost:3010/remoteEntry.js"
          //  app2: 'app2@http://localhost:3002/remoteEntry.js',
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
