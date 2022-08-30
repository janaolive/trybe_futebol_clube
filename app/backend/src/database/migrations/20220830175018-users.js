'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const usersTable = await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
   });
   return usersTable;
  },

  down: async (queryInterface, _Sequelize) => {
   await queryInterface.dropTable('users');
  }
};