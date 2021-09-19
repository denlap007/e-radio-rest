module.exports = {
    getRadioStations: async ({ query: { location, category, language }, server }) =>
        server.methods.getRadioStations({ location, category, language }),
};
