const path = require("path");

// https://medium.com/groww-engineering/enable-brotli-compression-in-webpack-with-fallback-to-gzip-397a57cf9fc6
const plugins = [];

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    const overrideConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@components": path.resolve(__dirname, "src", "lib", "components"),
          "@contexts": path.resolve(__dirname, "src", "lib", "contexts"),
          "@constants": path.resolve(__dirname, "src", "lib", "constants"),
          "@utils": path.resolve(__dirname, "src", "lib", "utils"),
          "@redux-injectors": path.resolve(
            __dirname,
            "src",
            "lib",
            "redux-injectors"
          ),
          "@test": path.resolve(__dirname, "src", "modules", "Test"),
          "@practice": path.resolve(__dirname, "src", "modules", "practice"),
        },
      },
      plugins: [...config.plugins, ...plugins],
    };

    return overrideConfig;
  },
  jest: function (config) {
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
  paths: function (paths, env) {
    return paths;
  },
};
