const liquidJs = require("liquidjs");

module.exports = function (eleventyConfig) {
  // Only enable the rendering engines I intend to use.
  eleventyConfig.setTemplateFormats("liquid, html");

  let options = {
    extname: ".liquid",
    dynamicPartials: true,
    strict_filters: true,
    root: ["_includes"],
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
};
