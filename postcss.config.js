module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? {
          "postcss-flexbugs-fixes": {},

          "postcss-preset-env": {
            autoprefixer: {
              flexbox: "no-2009",
              grid: "autoplace",
            },
            stage: 3,
            features: {
              "custom-properties": false,
            },
          },
        }
      : {
          "postcss-flexbugs-fixes": {}, // plugins used in development
          "postcss-preset-env": {
            autoprefixer: {
              flexbox: "no-2009",
              grid: "autoplace",
            },
            stage: 3,
            features: {
              "custom-properties": false,
            },
          },
        },
}
