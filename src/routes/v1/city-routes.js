const express = require('express');
const {CityController }= require('../../controllers');
const {CityMiddlewares} = require('../../middlewares');

const router = express.Router();

// City Routes
// /api/v1/cities POST
router.post('/',
    CityMiddlewares.validateCreateRequest,  // fixed typo here as well
    CityController.createCity
);


// /api/v1/cities/:id DELETE
router.delete('/:id',
    CityController.distoryCity
);

// /api/v1/cities/:id GET
router.get(
    '/:id',
    CityController.getCityById
);

// /api/v1/cities GET
router.get(
    '/',
    CityController.getAllCities
);
// /api/v1/cities/:id PUT
router.put(
    '/:id',
    CityMiddlewares.validateUpdateRequest,  // fixed typo here as well
    CityController.updateCity
);


module.exports = router;
