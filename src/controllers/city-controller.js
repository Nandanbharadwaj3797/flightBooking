const {StatusCodes} = require('http-status-codes');
const {CityService} = require('../services');

const{SuccessResponse, ErrorResponse} = require('../utils/common');
/**
 * POST:/cities
 * req.body = {name: "Delhi"}
 * 
 */

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({name: req.body.name});
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.data = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * DELETE: /cities/:id
 * req.params.id: string
 * req-body{}
 */

async function distoryCity(req, res) {
    try {
        const response = await CityService.distoryCity(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.data = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }    
}

/**
 * GET: /cities/:id
 * req.params.id: string
 * req-body{}
 */
async function getCityById(req, res) {
    try {
        const city = await CityService.getCityById(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = {
            message: error.message,
            explanation: error.explanation || 'No explanation provided'
        };
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

/**
 * GET : /cities
 * req.body{}
 */

async function getAllCities(req, res) {
    try {
        const cities = await CityService.getAllCities();
        SuccessResponse.data = cities;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.data = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
/** * PUT: /cities/:id
 * req.params.id: string
 * req.body: {name: "New Delhi"}
 */
async function updateCity(req, res) {
    try {
        const response = await CityService.updateCity(req.params.id,req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.data = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}



module.exports = {
    createCity,
    distoryCity,
    getCityById,
    getAllCities,
    updateCity
};