'use strict';
const { op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'Boeing747',
        capacity: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        modelNumber: 'AirbusA380',
        capacity: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {[op.or]:[{modelNumber: 'Boeing747'}, {modelNumber: 'AirbusA380'}
    ]}, {});
  }
};
