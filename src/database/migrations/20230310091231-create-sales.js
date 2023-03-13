'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      orderId: {
        type: Sequelize.UUID,
				references: {
					model: 'Orders',
					key: 'id',
				},
      },
      productId: {
        type: Sequelize.UUID,
				references: {
					model: 'Products',
					key: 'id',
				},
      },
			status: {
				type: Sequelize.STRING,
				defaultValue:'pending'
			},
      quantitySold: {
        type: Sequelize.STRING
      },
      expectedDeliveryDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Sales');
  }
};