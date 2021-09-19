const Boom = require("@hapi/boom");

const handleFailedResponse = async (request, h, err) => {
    const error = new Boom.Boom(err);
    error.output.payload.message = `Invalid Response Schema: ${err.message}`;

    throw error;
};

const handleValidationError = (request, h, err) => {
    throw err;
};

module.exports = {
    handleFailedResponse,
    handleValidationError,
};
