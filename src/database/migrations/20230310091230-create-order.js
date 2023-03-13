'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'pending'
      },
      products: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      buyerId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      paymentId: {
        type: Sequelize.UUID,
        references: {
          model: 'Payments',
          key: 'id',
        },
      },
      fullPrice: {
        type: Sequelize.INTEGER
      },
      shippingAddress: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
