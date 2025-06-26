const {StatusCodes}=require("http-status-codes");
const {FlightService} = require("../services/index");

const{ErrorResponse, SuccessResponse} = require('../utils/common');

/**
 * POST: /flights
 * request body: {
 *      flightNumber: string,
 *      airplaneId: number,
 *      departureAirportId: string,
 *      arrivalAirportId: string,
 *      departureTime: string,
 *      arrivalTime: string,
 *      price: number,
 *     boaringGate: string,
 *     totalSeats: number
 * 
 * }
 */

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boaringGate: req.body.boaringGate,
            totalSeats: req.body.totalSeats
        });

        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
    createFlight
};