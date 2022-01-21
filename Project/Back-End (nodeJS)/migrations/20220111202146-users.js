"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type : Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        fistName: {
          type: Sequelize.STRING,
          allowNull: false, 
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        }, 
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { timestamps: false }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
