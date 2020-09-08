const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");

const nextConfig = {
  distDir: "build",
  webpack: (config, options) => {
    // modify config 
    return config;
  },
  ignoreBuildErrors: false,
};

module.exports = withPlugins(
  [
    withCSS,
    [
      withSass,
      {
        cssModules: false,
      },
    ],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
  ],
  nextConfig
);
