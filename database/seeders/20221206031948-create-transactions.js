'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = [
      {
        id: 1,
        description: "Transaction",
        amount: 120,
        userId: 1,
        categoryId: 1,
        date: new Date()
      },
      {
        id: 2,
        description: "Transaction 2",
        amount: 140,
        userId: 2,
        categoryId: 2,
        date: new Date()
      },
    ]
    await queryInterface.bulkInsert('transactions', transaction, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('transactions', null, {});

  }
};

