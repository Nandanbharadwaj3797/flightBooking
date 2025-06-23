const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body || !req.body.name) {
        const errorResponse = { ...ErrorResponse }; // create fresh copy to avoid mutation issues
        errorResponse.message = "Something went wrong while creating city";
        errorResponse.error = new AppError(
            ["city name not found in the incoming request"],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
};