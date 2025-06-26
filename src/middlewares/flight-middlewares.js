const {StatusCodes}=require("http-status-codes");
const {ErrorResponse, SuccessResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const {Flight, Airplane} = require('../models');
async function validateFlightCreation(req, res, next) {
    if(!req.body.flightNumber){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Flight number is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Airplane ID is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Departure Airport ID is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Arrival Airport ID is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Arrival Time is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Departure Time is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.price || isNaN(req.body.price) || req.body.price <= 0){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Price is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.totalSeats || isNaN(req.body.totalSeats) || req.body.totalSeats <= 0){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Total Seats is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.boaringGate){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error = new AppError("Boaring Gate is required", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const airplaneId = req.body.airplaneId;
    const airplane = await Airplane.findByPk(airplaneId);
    if (!airplane) {
        ErrorResponse.error = new AppError(`Airplane ID ${airplaneId} not found`, StatusCodes.NOT_FOUND);
        ErrorResponse.message = "Airplane ID not found";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    const existingFlight = await Flight.findOne({ where: { airplaneId } });
    if (existingFlight) {
        ErrorResponse.error = new AppError(`Airplane ID ${airplaneId} is already assigned to flight ${existingFlight.flightNumber}`);
        ErrorResponse.message = "Airplane ID is already assigned to another flight";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={validateFlightCreation};

