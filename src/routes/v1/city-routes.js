const express = require('express');
const {CityController }= require('../../controllers');
const {CityMiddlewares} = require('../../middlewares');

const router = express.Router();

// City Routes
router.post('/',
    CityMiddlewares.validateCreateRequest,  // fixed typo here as well
    CityController.createCity
);

module.exports = router;
