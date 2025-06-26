const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

// Define routes for flight operations
// /api/v1/flights
router.post('/',
  FlightMiddlewares.validateFlightCreation,
  FlightController.createFlight
);

module.exports = router;