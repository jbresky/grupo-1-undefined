'use strict';
// const {Category} = require('../models/category.js') 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        id: 1,
        name: "Incomes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Outcomes",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
