const { toTitleCase } = require("../utils");

class RadioLocation {
    constructor(name, url) {
        this.name = toTitleCase(name);
        this.url = url;
    }
}

module.exports = { RadioLocation };
