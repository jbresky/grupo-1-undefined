const {transactionGenerator} = require('../../helpers/transactionGenerator');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transactions = await transactionGenerator();
    return Promise.all([...transactions]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
