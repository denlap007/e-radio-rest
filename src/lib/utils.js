const Wreck = require("@hapi/wreck");
const HtmlParser = require("node-html-parser");
const { v4: uuidv4 } = require("uuid");
const logger = require("./logging").Logger;

/**
 * Converts input text to title case.
 * @param {String} phrase, input apply transformation.
 * @returns {String} the input text transformed in title case.
 */
const toTitleCase = (phrase) =>
    phrase
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

/**
 * Parses html and returns a DOM object.
 * @param {Object} html, html document.
 * @returns {Object} a DOM object.
 */
const html2Dom = (html) => HtmlParser.parse(html.toString());

/**
 * Fetches html of provided url and returns a DOM object for manipulation.
 * @param {Object} options, options that will be passed to Wreck to perform the HTTP request.
 * @returns {Object} a DOM object.
 */
const createDomFromUrl = async (options) => {
    const { url, guid, ...opts } = options;

    logger.externalRequest(url);

    const {
        res: { statusCode },
        payload,
    } = await Wreck.get(url, { ...opts, headers: { ...opts.headers, guid: guid || uuidv4() } });

    logger.debug(`Got response from ${url} - ${statusCode}`, guid);

    return html2Dom(payload);
};

/**
 * Determines if HTTP response was successful by checking the response status code.
 * @param {Number} statusCode, the HTTP response status code.
 * @returns {Boolean}, true if response was successful, false otherwise.
 */
const isSuccess = (statusCode) => statusCode >= 200 && statusCode <= 399;

/**
 * Waits for N msecs.
 * @param {Number} msecs, time in msecs to wait
 */
const sleep = async (msecs) => new Promise((resolve) => setTimeout(resolve, msecs));

module.exports = {
    toTitleCase,
    html2Dom,
    createDomFromUrl,
    isSuccess,
    sleep,
};
