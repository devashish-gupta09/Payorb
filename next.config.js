const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
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
