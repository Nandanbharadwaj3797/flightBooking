const {StatusCodes} = require('http-status-codes');
const {CityRepository} = require('../repositories');
const CustomError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push( err.message);
            });
            throw new CustomError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new CustomError("Cannot create a new city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { createCity };