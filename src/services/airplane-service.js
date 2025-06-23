const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        console.error(`Something went wrong in the airplane service: createAirplane -> ${error.message}`);
        
        if (error.name === "SequelizeValidationError") { 
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error){
          throw new AppError("Cannot fetch data of all the  airplanes ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplaneById(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if (error.statusCode===StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present',error.statusCode);
        }
        throw new AppError("Cannot fetch the airplane by ID", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function distroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to delete is not present', error.statusCode);
        }
        throw new AppError("Cannot delete the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data) {
    try {
        const response = await airplaneRepository.update(id, data);
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to update is not present', error.statusCode);
        }
        else if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot update the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createAirplane,
    getAirplanes ,
    getAirplaneById,
    distroyAirplane,
    updateAirplane
};
