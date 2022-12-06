'use strict';
// const {Category} = require('../models/category.js') 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { id:1,
        name:"Incomes",
        description:"when you received money",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        name:"Outcomes",
        description:"when you spend or send money",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    await queryInterface.bulkInsert('Categories', categories, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Category', null, {});
     
  }
};
