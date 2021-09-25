module.exports.Config = {
    server: {
        host: process.env.host || "0.0.0.0",
        port: process.env.port || 8080,
        logLevel: process.env.loglevel || "debug",
    },
    application: {
        radioPortalUrl: "https://www.e-radio.gr",
    },
};
