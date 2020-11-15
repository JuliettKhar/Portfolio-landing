module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 52,
          browsers: ["last 12 versions", "safari 7"]
        }
      }
    ]
  ]
};
