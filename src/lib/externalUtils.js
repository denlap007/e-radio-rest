/**
 * Checks whether provided node is considered a station group.
 * @param {Object} node from DOM to check condition.
 * @returns {Boolean} true if DOM node classifies as a station group.
 */
const isStationGroup = (node) => node?.classList?.contains("menuOptionsHeader");

/**
 * Extracts text from provided DOM node.
 * @param {Object} node from DOM to get text.
 * @returns {String} node text.
 */
const getText = (node) => node?.rawText?.trim();

/**
 * Checks provided input if null, undefined or empty string.
 * @param {String} title input to check.
 * @returns {Boolean} true if input is null, undefined or empty string.
 */
const hasTitle = (title) => title != null && title !== "";

/**
 * Extracts href attribute value from provided input.
 * @param {SString} attrs attributes string to process.
 * @returns {String} href attribute value if found or empty string.
 */
const getHrefAttribute = (attrs) =>
    `${attrs}`
        .split(" ")
        .filter((attr) => attr.startsWith("href"))
        .join("")
        .split("href=")[1]
        ?.replace(/"/g, "") || "";

/**
 * Returns relative or absolute urls. If {pathname} parameter is an absolute url it returns it,
 * otherwise it considers it tha path of {baseurl}
 * @param {String} baseUrl a beseUrl provided.
 * @param {String} pathname a path provided.
 * @returns {String} a url absolute or relative.
 */
const getUrl = (baseUrl, pathname) =>
    `${pathname}`.startsWith("http") ? pathname : `${baseUrl}${pathname}`;

/**
 * Formats the input, by trimming spaces and removing any semicolons found at the end.
 * @param {String} url provided input.
 * @returns {String} input with trimmed spaces and no semicolon at the end.
 */
const formatMediaUrl = (url) => `${url}`.trim().replace(/;$/, "");

module.exports = {
    isStationGroup,
    getText,
    hasTitle,
    getHrefAttribute,
    getUrl,
    formatMediaUrl,
};
