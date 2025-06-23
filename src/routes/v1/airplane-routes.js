const express = require('express');

const router = express.Router();
const{AirplaneMiddlewares} = require('../../middlewares');

const { AirplaneController } = require('../../controllers');

// /api/v1/airplanes POST 
router
.post('/', 
    AirplaneMiddlewares.validateCreaterequest,AirplaneController.createAirplane
);

// /api/v1/airplanes GET
router
.get('/',
    AirplaneController.getAirplanes
);

// /api/v1/airplanes/:id GET
router
.get('/:id',
    AirplaneController.getAirplaneById
);

// /api/v1/airplanes/:id DELETE
router
.delete('/:id',
    AirplaneController.distroyAirplane
);

// /api/v1/airplanes/:id PUT
router
.put('/:id',
    AirplaneMiddlewares.validateUpdaterequest,
    AirplaneController.updateAirplane
);



module.exports = router;