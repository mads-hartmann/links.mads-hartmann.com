const { Liquid } = require("liquidjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(["liquid"]);
  eleventyConfig.setLibrary(
    "liquid",
    new Liquid({
      extname: ".liquid",
      dynamicPartials: true,
      strict_filters: true,
      root: ["_includes"],
    })
  );
  eleventyConfig.addPassthroughCopy("src/css");
};
