const Boom = require("@hapi/boom");

const ExtUtils = require("./externalUtils");
const Utils = require("./utils");
const { RadioLocation } = require("./dto/RadioLocation");
const { RadioCategory } = require("./dto/RadioCategory");
const { RadioGroup } = require("./dto/RadioGroup");
const { RadioStation } = require("./dto/RadioStation");
const logger = require("./logging").Logger;
const {
    Config: {
        application: { radioPortalUrl },
    },
} = require("../config");

/**
 * Retrieves the available radio groups by parsing the e-radio portal. Each group
 * has a set of categories.
 * @param {String} language used to get language specific content.
 * @returns {Array} a list of @type {RadioGroup} objects.
 */
const getRadioGroups = async (language) => {
    const url = `${radioPortalUrl}/?lang=${language}`;

    const dom = await Utils.createDomFromUrl({ url });

    const categoriesMenu = dom.querySelector("#tabListenCategoryMenu .menuFrame");
    let group = null;

    return categoriesMenu.childNodes.reduce((acc, child) => {
        if (ExtUtils.isStationGroup(child)) {
            group = new RadioGroup(ExtUtils.getText(child));
            acc.push(group);
        }

        if (child.rawTagName === "div") {
            child.childNodes.forEach((node) => {
                if (node.rawTagName === "a") {
                    const categoryTitle = ExtUtils.getText(node);

                    if (ExtUtils.hasTitle(categoryTitle)) {
                        const link = ExtUtils.getUrl(
                            radioPortalUrl,
                            ExtUtils.getHrefAttribute(node?.rawAttrs)
                        );
                        const category = new RadioCategory(categoryTitle, link);
                        group.categories.push(category);
                    }
                }
            });
        }

        return acc;
    }, []);
};

/**
 * Retrieves the available radio station locations by parsing the e-radio portal.
 * @param {String} language used to get language specific content.
 * @returns {Array} a list of @type {RadioLocation} objects.
 */
const getRadioLocations = async (language) => {
    const url = `${radioPortalUrl}/?lang=${language}`;

    const dom = await Utils.createDomFromUrl({ url });

    const locationsMenu = dom.querySelectorAll("#tabListenLocationMenu .menuOptions a");

    return locationsMenu.reduce((acc, elem) => {
        const location = ExtUtils.getText(elem);
        const link = ExtUtils.getUrl(radioPortalUrl, ExtUtils.getHrefAttribute(elem?.rawAttrs));
        acc.push(new RadioLocation(location, link));
        return acc;
    }, []);
};

const getRadioStations =
    (server) =>
    /**
     * Retrieves the available radio stations metadata for a specific cetegory or location.
     * @param {String} location a radio station location.
     * @param {String} category a radio station cagetory.
     * @param {String} language used for search input and results output.
     * @returns {Array} a list of @type {RadioStation} objects.
     */
    async ({ location, category, language }) => {
        const path = category ? "radio-categories" : "radio-locations";

        try {
            // get locations/categories
            const { result, statusCode } = await server.inject(
                `/api/v1.0/metadata/${path}?language=${language}`
            );
            // make sure there were no errors
            if (!Utils.isSuccess(statusCode)) {
                throw result;
            }
            // get the location/category url to fetch html
            const { url } =
                result.find(
                    ({ name }) =>
                        `${name}`.toLowerCase() === `${category || location}`.toLowerCase()
                ) ?? {};

            if (!url) {
                return Boom.notFound();
            }

            const dom = await Utils.createDomFromUrl({
                url: `${url}?lang=${language}`,
            });
            // process html to extract metadata
            const divs = dom.querySelectorAll(".warper");

            const proms = await Promise.allSettled(
                divs.map(async (div, idx) => {
                    const href = div.querySelector("a").getAttribute("href");
                    const img = div.querySelector("img");
                    const logoUrl = img.getAttribute("src");
                    const name = img.getAttribute("alt");
                    const metaLocation = div.querySelector(".sMeta_Location").text;
                    const profileUrl = div.querySelector("a.sMeta_Profile").getAttribute("href");
                    let iframe;
                    let mediaUrl;

                    // do not brute-force the server
                    await Utils.sleep(idx * 10);
                    // do not allow rejections, in order to populate a complete list with/without media url
                    try {
                        const fetchUrl = `${radioPortalUrl.replace("https", "http")}${href}`;

                        iframe = await Utils.createDomFromUrl({
                            url: fetchUrl,
                        });
                        mediaUrl = (iframe.innerText.match(/mp3: "(.*)"/) || [])[1] || "";
                    } catch (error) {
                        logger.error(
                            `Error retrieving media url: ${name} | ${href} | ${error.message}`
                        );
                    }

                    if (!mediaUrl) {
                        logger.warning(`Could not extract media url for: ${name} | ${href}`);
                    }

                    return new RadioStation({
                        name,
                        location: metaLocation,
                        mediaUrl,
                        logoUrl,
                        profileUrl: `${radioPortalUrl}${profileUrl}`,
                    });
                })
            );

            return proms.map(({ value }) => value);
        } catch (error) {
            return error;
        }
    };

module.exports = {
    getRadioGroups,
    getRadioLocations,
    getRadioStations,
};
