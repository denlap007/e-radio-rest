const { v4: uuidv4 } = require("uuid");
const { LOG_TYPES } = require("./enums");

class Logger {
    static server = null;

    static init = (server) => {
        if (!Logger.server) {
            Logger.server = server;
        }
    };

    static createlogRecord = (level, guid, msg) =>
        `${new Date().toISOString()} [${process.pid}] ${level.toUpperCase()} - ${
            guid || uuidv4()
        } - ${msg}`;

    static request = ({ query, params, method, path, headers, info: { remoteAddress } }) => {
        const { level, levelCode, message } = LOG_TYPES.HAPI_REQUEST;
        const data = {
            query,
            params,
        };
        const clientIP = headers["x-forwarded-for"] || remoteAddress;

        const logMsg = `${message} ${method} ${path}, data: ${JSON.stringify(
            data
        )}, client-ip: ${clientIP}`;
        this.server.log(levelCode, Logger.createlogRecord(level, headers.guid, logMsg));
    };

    static response = ({
        method,
        path,
        headers,
        info: { responded, received },
        response: { statusCode },
    }) => {
        const { level, levelCode, message } = LOG_TYPES.HAPI_RESPONSE;

        const logMsg = `${message} ${method} ${path} ${statusCode}, (${responded - received} ms)`;
        this.server.log(levelCode, Logger.createlogRecord(level, headers.guid, logMsg));
    };

    static externalRequest = (url, guid) => {
        const { level, levelCode, message } = LOG_TYPES.EXTERNAL_API_REQUEST;

        const logMsg = `${message} ${url}`;
        this.server.log(levelCode, Logger.createlogRecord(level, guid, logMsg));
    };

    static debug = (message, guid) => {
        const { level, levelCode } = LOG_TYPES.DEBUG;

        this.server.log(levelCode, Logger.createlogRecord(level, guid, message));
    };

    static info = (message, guid) => {
        const { level, levelCode } = LOG_TYPES.INFO;

        this.server.log(levelCode, Logger.createlogRecord(level, guid, message));
    };

    static warning = (message, guid) => {
        const { level, levelCode } = LOG_TYPES.WARNING;

        this.server.log(levelCode, Logger.createlogRecord(level, guid, message));
    };

    static error = (error, guid) => {
        const { level, levelCode } = LOG_TYPES.ERROR;
        const msg = typeof error === "string" ? error : `${error.stack}`;
        this.server.log(levelCode, Logger.createlogRecord(level, guid, msg));
    };
}

module.exports = { Logger };
