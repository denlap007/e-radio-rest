const Joi = require("joi");
const Handlers = require("./handlers");
const Validations = require("./validations");
const HandleError = require("../../lib/handleError");
const CommonSchemas = require("../../lib/validations/common");

module.exports = [
    {
        method: "GET",
        path: "/api/v1.0/radio-stations",
        options: {
            handler: Handlers.getRadioStations,
            validate: {
                query: Joi.object({
                    language: CommonSchemas.LanguageSchema,
                    category: Joi.string().description("Radio station category"),
                    location: Joi.string().description("Radio station location"),
                }).xor("category", "location"),
                failAction: HandleError.handleValidationError,
            },
            response: {
                sample: 0,
                status: {
                    200: Validations.RadionStationListSchema,
                    400: CommonSchemas.ErrorSchema(400, "Bad Request"),
                    404: CommonSchemas.ErrorSchema(404, "Not Found"),
                    500: CommonSchemas.ErrorSchema(500, "Internal Server Error"),
                },
                failAction: HandleError.handleFailedResponse,
            },
            description: "Get radio stations",
            notes: "Returns a list of radio stations",
            tags: ["api", "Radio Stations"],
        },
    },
];
