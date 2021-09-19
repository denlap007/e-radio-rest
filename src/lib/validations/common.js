const Joi = require("joi");

const ErrorSchema = (status = 0, error = "", message = "") =>
    Joi.object({
        statusCode: Joi.number().integer().default(status).required(),
        error: Joi.string().default(error).required(),
        message: Joi.string().default(message).required(),
    })
        .unknown()
        .label(`${status}-Error`);

const LanguageSchema = Joi.string()
    .valid("en", "el")
    .default("en")
    .description("Language for search input and results output");

module.exports = {
    ErrorSchema,
    LanguageSchema,
};
