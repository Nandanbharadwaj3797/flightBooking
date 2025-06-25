const express = require('express');
const router = express.Router();

const {AirportController} = require('../../controllers');
const {AirportMiddlewares} = require('../../middlewares');

// GET: /airports
router.post('/',
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport
);

// GET: /airports/:id
router.get('/:id',
    AirportController.getAirportById
);

// GET: /airports
router.get('/',
    AirportController.getAirports
);

// DELETE: /airports/:id
router.delete('/:id',
    AirportController.distroyAirport
);

// PUT: /airports/:id
router.put('/:id',
    AirportMiddlewares.validateUpdateRequest,
    AirportController.updateAirport
);

module.exports = router;