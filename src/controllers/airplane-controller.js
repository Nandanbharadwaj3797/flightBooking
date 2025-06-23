const{AirplaneService} = require('../services');
const{StatusCodes} = require('http-status-codes');

const{ErrorResponse, SuccessResponse} = require('../utils/common');
/**
 * POST: /airplanes
 * req.body{
 *  modelNumber: string,capacity: number}
 */
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({modelNumber: req.body.modelNumber, capacity: req.body.capacity});

        SuccessResponse.data = airplane;
        
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
    * GET: /airplanes/:id
    * req.params.id: string
    * req-body{}
    * 
*/
async function getAirplaneById(req, res) {
    try {
        const airplane = await AirplaneService.getAirplaneById(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/** * DELETE: /airplanes/:id
 * req.params.id: string
 * req-body{}
 */

async function distroyAirplane(req, res) {
    try {
        const response = await AirplaneService.distroyAirplane(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * PUT: /airplanes/:id
 * req.params.id: string
 * req.body{modelNumber: string, capacity: number}
 */
async function updateAirplane(req, res) {
    try {
        const response = await AirplaneService.updateAirplane(req.params.id, req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


module.exports = { 
    createAirplane,
    getAirplanes,
    getAirplaneById,
    distroyAirplane,
    updateAirplane
};