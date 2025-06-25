'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId'
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId'
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId'
      });
    }
  }
  Flight.init({
    flightNumber:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      // validate: {
      //   notEmpty: true,
      //   is: /^[A-Z]{2}\d{3,4}$/ // E
      // }

    },
    airplaneId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },

    departureAirportId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalTime:{
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime:{
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    boaringGate:{

      type: DataTypes.STRING
      // validate: {
      //   is: /^[A-Z0-9]{1,5}$/ // Example: A1, B2, C3D4
      // }
    },
    totalSeats:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    },


  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};