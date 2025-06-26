const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories/index");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helper/datetime-helper");

const flightRepository = new FlightRepository();

const createFlight = async (flightDetails) => {
    try {
        if (!compareTime(flightDetails.arrivalTime, flightDetails.departureTime)) {
            throw new AppError("Arrival time should be greater than departure time", StatusCodes.BAD_REQUEST);
        }

        const flight = await flightRepository.create(flightDetails);
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const explanation = error.errors.map(err => err.message);
            throw new AppError(explanation.join(', '), StatusCodes.BAD_REQUEST);
        }

        if (error instanceof AppError) {
            throw error; 
        }

        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { createFlight };
