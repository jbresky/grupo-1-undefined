"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let roles = [
      {
        name: "Usuario",
        description: "Usuarios que consumen el sitio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Administrador",
        description: "Usuarios que administran el sitio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Roles", roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
