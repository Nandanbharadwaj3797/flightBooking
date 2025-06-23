const express = require('express');
const {CityController} = require('../../controllers');

const router = express.Router();

// City Routes
// POST /api/v1/cities
router
.post('/',
    CityController.createCity
);

module.exports = router;