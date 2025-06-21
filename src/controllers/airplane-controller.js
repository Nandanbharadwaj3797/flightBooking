const{AirplaneService} = require('../services');
const{StatusCodes} = require('http-status-codes');

/**
 * POST: /airplanes
 * req.body{
 *  modelNumber: string,capacity: number}
 */

async function createAirplane(req, res) {
    try {
        console.log("Inside createAirplane controller");
        const airplane = await AirplaneService.createAirplane({modelNumber: req.body.modelNumber, capacity: req.body.capacity});
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Airplane created successfully',
            data: airplane,
            error:{}
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong in the createAirplane controller",
            data: {},
            error:error
        });
    }
}

module.exports = { createAirplane };