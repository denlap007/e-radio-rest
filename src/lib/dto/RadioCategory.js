const { toTitleCase } = require("../utils");

class RadioCategory {
    constructor(name, url) {
        this.name = toTitleCase(name);
        this.url = url;
    }
}

module.exports = { RadioCategory };
