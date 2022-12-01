'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      userId:{
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      date:{
      type: Sequelize.DATE,
      allowNull: false
      },
      deleteAt:{
        type: Sequelize.DATE,
      }
      


    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};




