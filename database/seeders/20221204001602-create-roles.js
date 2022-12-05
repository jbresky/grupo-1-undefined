const { Role } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      Role.create({
        id: 1,
        name: "Usuario",
        description: "Usuarios que consumen el sitio",
      }),
      Role.create({
        id: 2,
        name: "Administrador",
        description: "Usuarios que administran el sitio",
      }),
    ]);

    /* let roles = [
      {
        id: 1,
        name: "Usuario",
        description: "Usuarios que consumen el sitio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Administrador",
        description: "Usuarios que administran el sitio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]; */

    await queryInterface.bulkInsert("Roles", roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
