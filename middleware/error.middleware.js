const STATUS_CODES = require("../statusCodes");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, errors } = err;

  if (!statusCode) statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (!message) message = 'An unexpected error occurred.';

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    errors: errors || null,
  });
};

module.exports = errorHandler;
