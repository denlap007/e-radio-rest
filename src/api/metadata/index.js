const Joi = require("joi");
const Handlers = require("./handlers");
const Validations = require("./validations");
const HandleError = require("../../lib/handleError");
const CommonSchemas = require("../../lib/validations/common");

module.exports = [
    {
        method: "GET",
        path: "/api/v1.0/metadata/radio-groups",
        options: {
            handler: Handlers.getRadioGroups,
            validate: {
                query: Joi.object({
                    language: CommonSchemas.LanguageSchema,
                }),
                failAction: HandleError.handleValidationError,
            },
            response: {
                status: {
                    200: Validations.RadioGroupList,
                    500: CommonSchemas.ErrorSchema(500, "Internal Server Error"),
                },
                failAction: HandleError.handleFailedResponse,
            },
            description: "Get radio station groups",
            notes: "Returns a list of radio station groups",
            tags: ["api", "Radio Metadata"],
        },
    },
    {
        method: "GET",
        path: "/api/v1.0/metadata/radio-groups/{name}",
        options: {
            handler: Handlers.getRadioGroupByName,
            validate: {
                query: Joi.object({
                    language: CommonSchemas.LanguageSchema,
                }),
                params: Joi.object({
                    name: Joi.string().description("Group Name"),
                }),
                failAction: HandleError.handleValidationError,
            },
            response: {
                status: {
                    200: Validations.RadioGroup,
                    404: CommonSchemas.ErrorSchema(404, "Not Found"),
                    500: CommonSchemas.ErrorSchema(500, "Internal Server Error"),
                },
                failAction: HandleError.handleFailedResponse,
            },
            description: "Get a radio station group details",
            notes: "Returns the requested radio station group details",
            tags: ["api", "Radio Metadata"],
        },
    },
    {
        method: "GET",
        path: "/api/v1.0/metadata/radio-locations",
        options: {
            handler: Handlers.getRadioLocations,
            validate: {
                query: Joi.object({
                    language: CommonSchemas.LanguageSchema,
                }),
                failAction: HandleError.handleValidationError,
            },
            response: {
                status: {
                    200: Validations.NameUrlList,
                    500: CommonSchemas.ErrorSchema(500, "Internal Server Error"),
                },
                failAction: HandleError.handleFailedResponse,
            },
            description: "Get radio station locations",
            notes: "Returns a list of radio station locations",
            tags: ["api", "Radio Metadata"],
        },
    },
    {
        method: "GET",
        path: "/api/v1.0/metadata/radio-categories",
        options: {
            handler: Handlers.getRadioCategories,
            validate: {
                query: Joi.object({
                    language: CommonSchemas.LanguageSchema,
                }),
                failAction: HandleError.handleValidationError,
            },
            response: {
                status: {
                    200: Validations.NameUrlList,
                    500: CommonSchemas.ErrorSchema(500, "Internal Server Error"),
                },
                failAction: HandleError.handleFailedResponse,
            },
            description: "Get radio station categories",
            notes: "Returns a list of radio station categories",
            tags: ["api", "Radio Metadata"],
        },
    },
];
