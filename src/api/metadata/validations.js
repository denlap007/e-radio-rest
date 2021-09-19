const Joi = require("joi");

const NameUrl = Joi.object({
    name: Joi.string(),
    url: Joi.string().uri(),
}).label("NameUrl");

const NameUrlList = Joi.array().items(NameUrl).label("NameUrlList");

const RadioGroup = Joi.object({
    group: Joi.string(),
    categories: Joi.array().items(NameUrl),
}).label("RadioGroup");

const RadioGroupList = Joi.array().items(RadioGroup).label("RadioGroupList");

module.exports = {
    NameUrlList,
    RadioGroupList,
    RadioGroup,
};
