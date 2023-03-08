'use strict';

/** @type {import('sequelize-cli').Migration} */
function cleanArray (arr) {
  return '{"' + arr.map(e => cleanEntry(e)).join('", "') + '"}';
}

function cleanEntry (obj) {
  return JSON.stringify(obj).replace(/"/g, '\\"');
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          id: '97b25d19-a342-4d41-9d6a-1d55b738349e',
          buyerId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
          status: 'pending',
          products: cleanArray([
            {
              quantity: 3,
              productId: '6717e8c7-c058-4670-90c3-5c8953cc844a'
            }]),
          fullPrice: '1000',
          shippingAddress: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 'fb23adef-b2e5-40f1-9066-07644961a0b3',
          buyerId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
          status: 'pending',
          products: cleanArray([
            {
              quantity: 3,
              productId: '6717e8c7-c058-4670-90c3-5c8953cc844a'
            }]),
          fullPrice: '1000',
          shippingAddress: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'de17c74a-2d71-4c01-9ab8-0f213d23038a',
          status: 'pending',
          buyerId: '76432d88-a891-4c4f-9b8f-aca96513f4dd',
          products: cleanArray([
            {
              quantity: 3,
              productId: '6717e8c7-c058-4670-90c3-5c8953cc844a'
            }]),
          fullPrice: 30000,
          paymentId: '1357affd-beb6-438d-b6e9-9e48d68bad24',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd6c7cce3-7f3c-4e98-a705-68377bc9dc23',
          status: 'pending',
          buyerId: '76432d88-a891-4c4f-9b8f-aca96513f4dd',
          products: cleanArray([
            {
              quantity: 3,
              productId: '6717e8c7-c058-4670-90c3-5c8953cc844a'
            }]),
          fullPrice: 30000,
          paymentId: '1357affd-beb6-438d-b6e9-9e48d68bad24',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '915dc7f5-b871-4260-9762-0711f2422cdd',
          status: 'delivered',
          buyerId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
          products: cleanArray([
            {
              quantity: 3,
              productId: '6717e8c7-c058-4670-90c3-5c8953cc844a'
            }]),
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
