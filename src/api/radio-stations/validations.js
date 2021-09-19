const Joi = require("joi");

const RadioStationSchema = Joi.object({
    name: Joi.string().allow(""),
    location: Joi.string().allow(""),
    mediaUrl: Joi.string().allow(""),
    logoUrl: Joi.string().allow(""),
    profileUrl: Joi.string().allow(""),
}).label("RadioStationSchema");

const RadionStationListSchema = Joi.array()
    .items(RadioStationSchema)
    .label("RadioStationListSchema");

module.exports = {
    RadionStationListSchema,
};
