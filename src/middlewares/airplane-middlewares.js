const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreaterequest(req, res, next) {
    if (!req.body.modelNumber) {
        const errorResponse = { ...ErrorResponse };  // shallow clone to avoid shared mutation
        errorResponse.message = "something went wrong while creating airplane";
        errorResponse.error = new AppError(
            ["modelNumber not found in the ongoing request in the correct form"],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}
function validateUpdaterequest(req, res, next) {
    if (!req.body.modelNumber) {
        const errorResponse = { ...ErrorResponse };  // shallow clone to avoid shared mutation
        errorResponse.message = "something went wrong while updating airplane";
        errorResponse.error = new AppError(
            ["modelNumber not found in the ongoing request in the correct form"],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}


module.exports = {
    validateCreaterequest,
    validateUpdaterequest
};
