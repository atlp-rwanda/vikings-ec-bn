/* eslint-disable no-unused-vars */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      expiryDate: {
        type: Sequelize.DATE,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      bonus: {
        type: Sequelize.INTEGER,
      },
      isExpired: {
        type: Sequelize.BOOLEAN,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      wished:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
