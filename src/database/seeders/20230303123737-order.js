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
          // products: ['b5e75a01-5e67-44ad-91bd-f36ab3564a48','b1093b42-f577-4c7f-86db-13a35b6e1112'],
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

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  }
};
