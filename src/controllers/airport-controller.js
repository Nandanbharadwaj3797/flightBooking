const{StatusCodes} = require('http-status-codes');

const{AirportService} = require('../services');

const{ErrorResponse, SuccessResponse} = require('../utils/common');

/**
 * GET: /airports
 * req-body{name: string, code: string, address: string, cityId: string}
 * req-body{name:"Indira Gandhi International Airport", code: "DEL", address: "New Delhi, India", cityId: "1"}
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });

        SuccessResponse.data = airport;
        return res.
            status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * GET: /airports
 * req-body{}
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/** * GET: /airports/:id
 * req.params.id: string
 * req-body{/id: string}
 */

async function getAirportById(req, res) {
    try {
        const airport = await AirportService.getAirportById(req.params.id);
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

/** * DELETE: /airports/:id
 * req.params.id: string
 * req-body{}
 */

async function distroyAirport(req, res) {
    try {
        const response = await AirportService.distroyAirport(req.params.id);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * PUT: /airports/:id
 * req.params.id: string
 * req-body{name: string, code: string, address: string, cityId: string}
 */
async function updateAirport(req, res) {
    try {
        const response = await AirportService.updateAirport(req.params.id, {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirportById,
    distroyAirport,
    updateAirport
}