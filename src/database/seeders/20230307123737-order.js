'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          id: '97b25d19-a342-4d41-9d6a-1d55b738349e',
          buyerId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
          status: 'pending',
          products: null,
          fullPrice: '1000',
          shippingAddress: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 'fb23adef-b2e5-40f1-9066-07644961a0b3',
          buyerId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
          status: 'pending',
          products: null,
          fullPrice: '1000',
          shippingAddress: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'de17c74a-2d71-4c01-9ab8-0f213d23038a',
          status: 'pending',
          buyerId: '76432d88-a891-4c4f-9b8f-aca96513f4dd',
          products: null,
          fullPrice: 30000,
          paymentId: '1357affd-beb6-438d-b6e9-9e48d68bad24',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  }
};
