'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
         id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
          buyerId: {
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          productId: {
            type: Sequelize.UUID,
            references: {
              model: 'Products',
              key: 'id',
            }
          },
          rate: {
           
            type: Sequelize.INTEGER
          },
         feedback:{
            type: Sequelize.STRING,
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
    await queryInterface.dropTable('Ratings');
  },
};