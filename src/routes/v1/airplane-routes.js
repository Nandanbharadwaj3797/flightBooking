const express = require('express');

const router = express.Router();

const { AirplaneController } = require('../../controllers');
console.log("Inside v1 airplane routes");
// /api/v1/airplanes POST 
router.post('/', AirplaneController.createAirplane);

module.exports = router;