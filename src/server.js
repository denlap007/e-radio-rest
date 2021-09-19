const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const { v4: uuidv4 } = require("uuid");

const MetadataRoutes = require("./api/metadata/index");
const StationsRoutes = require("./api/radio-stations/index");
const ServerMethods = require("./lib/serverMethods");
const { Config } = require("./config");
const { Logger } = require("./lib/logging");
const { LOG_LEVEL_CD } = require("./lib/enums");

const createServer = async () => {
    const { host, port, logLevel } = Config.server;

    const server = Hapi.server({
        host,
        port,
    });

    server.app = {
        logLevel: logLevel.toUpperCase(),
    };

    // setup routes
    server.route([...MetadataRoutes, ...StationsRoutes]);

    // setup server-methods with caching
    server.method("getRadioGroups", ServerMethods.getRadioGroups, {
        cache: {
            expiresIn: 10 * 24 * 60 * 60 * 1000,
            generateTimeout: 60 * 1000,
        },
        generateKey: (language) => language,
    });

    server.method("getRadioLocations", ServerMethods.getRadioLocations, {
        cache: {
            expiresIn: 10 * 24 * 60 * 60 * 1000,
            generateTimeout: 60 * 1000,
        },
        generateKey: (language) => language,
    });

    server.method("getRadioStations", ServerMethods.getRadioStations(server), {
        cache: {
            expiresIn: 10 * 24 * 60 * 60 * 1000,
            generateTimeout: 2 * 60 * 1000,
        },
        generateKey: ({ location, category, language }) => `${language}-${location || category}`,
    });

    // setup logging
    const isLoggable = (path) => !path.includes("/swagger");

    Logger.init(server);

    server.decorate("request", "logger", Logger);
    server.decorate("server", "logger", Logger);

    // add guid to track reqquest-response
    server.ext("onRequest", async (request, h) => {
        if (!request.headers.guid) {
            request.headers.guid = uuidv4();
        }

        return h.continue;
    });

    server.ext("onPreHandler", async (request, h) => {
        if (isLoggable(request.url.pathname)) {
            server.logger.request(request);
        }

        return h.continue;
    });

    server.ext("onPreResponse", async (request, h) => {
        if (request.response.isBoom) {
            server.logger.error(request.response);
        }

        return h.continue;
    });

    server.events.on("response", async (request) => {
        if (isLoggable(request.url.pathname)) {
            server.logger.response(request);
        }
    });

    // log only events in the current logging level
    server.events.on("log", (event, tags) => {
        const lvl =
            (tags[LOG_LEVEL_CD.DEBUG] && LOG_LEVEL_CD.DEBUG) ||
            (tags[LOG_LEVEL_CD.INFO] && LOG_LEVEL_CD.INFO) ||
            (tags[LOG_LEVEL_CD.WARNING] && LOG_LEVEL_CD.WARNING) ||
            (tags[LOG_LEVEL_CD.ERROR] && LOG_LEVEL_CD.ERROR);

        if (tags[lvl] && lvl >= LOG_LEVEL_CD[server.app.logLevel]) {
            console.log(event.data);
        }
    });

    // setup plugins
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: "API",
                    version: "1.0",
                },
                tags: [
                    {
                        name: "Radio Metadata",
                        description: "Radio Metadata",
                    },
                    {
                        name: "Radio Stations",
                        description: "Radio Stations",
                    },
                ],
                schemes: ["http", "https"],
                documentationPath: "/api-doc",
                grouping: "tags",
                sortEndpoints: "ordered",
            },
        },
    ]);

    return server;
};

const init = async () => {
    const server = await createServer();

    await server.initialize();

    return server;
};

const start = async () => {
    const server = await createServer();

    await server.start();

    server.logger.info(`Server running on ${server.info.uri}`);

    return server;
};

module.exports = {
    init,
    start,
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

process.on("SIGINT", () => {
    process.exit(0);
});
