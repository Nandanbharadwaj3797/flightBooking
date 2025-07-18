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
    const transaction = await db.sequelize.transaction();
    try{
      await db.sequelize.query(addRowLockOnFlights(flightId));
      const flight= await Flight.findByPk(flightId);
      if(+dec){
        await flight.decrement('totalSeats', {by:seats}, {transaction: transaction});
      }
      else {
        await flight.increment('totalSeats', {by:seats}, {transaction: transaction});
      }
      await transaction.commit();
      await flight.reload();
      return flight;
    }catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
