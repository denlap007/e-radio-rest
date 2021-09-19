const PROMISE_STATUS = Object.freeze({ FULFILLED: "fulfilled", REJECTED: "rejected" });
const LOG_LEVEL_CD = Object.freeze({
    TRACE: 1,
    DEBUG: 10,
    INFO: 20,
    WARNING: 30,
    ERROR: 40,
});
const LOG_LEVELS = Object.freeze({
    TRACE: "trace",
    DEBUG: "debug",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
});
const LOG_TYPES = {
    HAPI_REQUEST: {
        id: 1,
        name: "request",
        code: 1000,
        message: "Incoming Request",
        level: LOG_LEVELS.INFO,
        levelCode: LOG_LEVEL_CD.INFO,
    },
    HAPI_RESPONSE: {
        id: 2,
        name: "response",
        code: 1001,
        message: "Outgoing Response",
        level: LOG_LEVELS.INFO,
        levelCode: LOG_LEVEL_CD.INFO,
    },
    TRACE: {
        id: 3,
        name: "trace",
        code: 1002,
        message: "Trace Log",
        level: LOG_LEVELS.TRACE,
        levelCode: LOG_LEVEL_CD.TRACE,
    },
    DEBUG: {
        id: 4,
        name: "debug",
        code: 1003,
        message: "Debug Log",
        level: LOG_LEVELS.DEBUG,
        levelCode: LOG_LEVEL_CD.DEBUG,
    },
    INFO: {
        id: 5,
        name: "info",
        code: 1005,
        message: "Info Log",
        level: LOG_LEVELS.INFO,
        levelCode: LOG_LEVEL_CD.INFO,
    },

    WARNING: {
        id: 6,
        name: "warning",
        code: 1006,
        message: "Warning Log",
        level: LOG_LEVELS.WARNING,
        levelCode: LOG_LEVEL_CD.WARNING,
    },
    ERROR: {
        id: 7,
        name: "error",
        code: 2000,
        message: "Error Log",
        level: LOG_LEVELS.ERROR,
        levelCode: LOG_LEVEL_CD.ERROR,
    },
    EXTERNAL_API_REQUEST: {
        id: 100,
        name: "external_api_request",
        code: 3000,
        message: "Sending Request",
        level: "info",
        levelCode: LOG_LEVEL_CD.INFO,
    },
};

module.exports = {
    PROMISE_STATUS,
    LOG_TYPES,
    LOG_LEVEL_CD,
    LOG_LEVELS,
};
