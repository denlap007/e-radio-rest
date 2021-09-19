const Boom = require("@hapi/boom");

module.exports = {
    getRadioGroups: async ({ query: { language }, server }) =>
        server.methods.getRadioGroups(language),

    getRadioGroupByName: async ({ query: { language }, params: { name }, server }) => {
        const categories = await server.methods.getRadioGroups(language);
        const group = categories.find((elem) => elem.group.toLowerCase() === name.toLowerCase());

        if (group == null) {
            throw Boom.notFound();
        }

        return group;
    },

    getRadioLocations: async ({ query: { language }, server }) =>
        server.methods.getRadioLocations(language),

    getRadioCategories: async ({ query: { language }, server }) => {
        const groups = await server.methods.getRadioGroups(language);
        return groups.map((group) => group.categories).flat();
    },
};
