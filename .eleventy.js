const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const sass = require('sass');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("_src/assets");

    eleventyConfig.addFilter("formatDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toISODate();
    });

    eleventyConfig.addFilter(
        'cssmin',
        code => sass.compileString( code, {style: "compressed"}).css
    );

    let markdownOptions = {
        html: true,
        breaks: true,
        linkify: true
    };
    let markdownLib = new markdownIt(markdownOptions);

    eleventyConfig.setLibrary("md", markdownLib);

    return {
        templateFormats: [
            "md"
        ],
        pathPrefix: "/",
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: "_src",
            includes: "_templates",
            data: "_data",
            output: "_site"
        }
    };
};