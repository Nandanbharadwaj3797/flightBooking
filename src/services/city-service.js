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


async function distoryCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new CustomError('The city you requested to delete is not present', error.statusCode);
        }
        throw new CustomError("Cannot delete the city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCityById(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new CustomError('The city you requested is not present', StatusCodes.NOT_FOUND);
        }
        throw new CustomError("Cannot fetch the city by ID", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new CustomError("Cannot fetch data of all the  cities ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        return response;
    }
    catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new CustomError('The city you requested to update is not present', error.statusCode);
        }
        throw new CustomError("Cannot update the city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = { 
    createCity,
    distoryCity,
    getCityById,
    getAllCities,
    updateCity

 };