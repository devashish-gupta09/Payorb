const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const moduleExports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
      },
    });

    return config;
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  target: "serverless",
  headers: {
    source: "/about",
    headers: [
      {
        key: "max-age",
        value: 9999999999999,
      },
    ],
  },
});

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  org: "payorb",
  project: "payorb",
  authToken: "c79dc10f510641c8ba0e83c0d71a7744a88277453b5d41f886fcaf1364181f61",
  silent: false,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
