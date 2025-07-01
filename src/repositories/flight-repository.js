const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const Sequelize = require('sequelize');

const db= require('../models');

const {addRowLockOnFlights}=require('./queries');
const { add } = require('winston');


class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

 
  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          require: true,
          as: 'airplaneDetails'  
        },
        {
          model: Airport,
          require: true,
          as: 'departureAirport',
          on :{
            col1:Sequelize.where(
              Sequelize.col('Flight.departureAirportId'),"=",
              Sequelize.col('departureAirport.code')
            )
          },
          include:{
            model: City,
            require: true
          }
        },
        {
          model: Airport,
          require: true,
          as: 'arrivalAirport',
          on :{
            col1:Sequelize.where(
              Sequelize.col('Flight.arrivalAirportId'),"=",
              Sequelize.col('arrivalAirport.code')
            )
          },
          include:{
            model: City,
            require: true
          }
        }
      ]
    });
    return response;
  }
  async updateRemainingSeats(flightId, seats,dec=true) {
    await db.sequelize.query(addRowLockOnFlights(flightId));

    const flight= await Flight.findByPk(flightId);
    if(!flight) {
      throw {
        statusCode: 404,
        message: 'Flight not found'
      };
    }
    if(+dec){
      await flight.decrement('totalSeats', {by:seats});
    }
    else {
      await flight.increment('totalSeats', {by:seats});
    }
    await flight.reload();
    return flight;
  }
}

module.exports = FlightRepository;


/**
  // if(dec) {
  //     const response = await Flight.decrement('totalSeats', {
  //       by: seats,
  //       where: {
  //         id: flightId
  //       }
  //     });
  //     return response;
  //   } else {
  //     const response = await Flight.increment('totalSeats', {
  //       by: seats,
  //       where: {
  //         id: flightId
  //       }
  //     });
  //     return response;
  //   }
  // }
 */