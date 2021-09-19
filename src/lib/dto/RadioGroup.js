const { toTitleCase } = require("../utils");

class RadioGroup {
    constructor(group) {
        this.group = toTitleCase(group);
        this.categories = [];
    }
}

module.exports = { RadioGroup };
