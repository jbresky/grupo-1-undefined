const { usersGenerator, adminsGenerator } = require("../../helpers/usersGenerators");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = usersGenerator();
    const admins = adminsGenerator();
    return Promise.all([...users, ...admins]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

