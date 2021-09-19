const { toTitleCase } = require("../utils");
const { formatMediaUrl } = require("../externalUtils");

class RadioStation {
    constructor({ name = "", location = "", mediaUrl = "", logoUrl = "", profileUrl = "" }) {
        this.name = toTitleCase(name);
        this.location = location.trim();
        this.mediaUrl = formatMediaUrl(mediaUrl);
        this.logoUrl = logoUrl.trim();
        this.profileUrl = profileUrl.trim();
    }
}

module.exports = { RadioStation };
