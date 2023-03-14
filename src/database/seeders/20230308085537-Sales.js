'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Sales',
      [
        {
          id:'b2aa6e5b-c31f-40f9-ae1e-a1e20f952fe8',
          orderId: '97b25d19-a342-4d41-9d6a-1d55b738349e',
          productId: '1e9ac7b1-2760-462b-a0f9-28f85867836f',
          status: 'accepted',
          quantitySold:'2',
          expectedDeliveryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:'2525bc98-52aa-4a44-a518-601523b03de6',
          orderId: '97b25d19-a342-4d41-9d6a-1d55b738349e',
          productId: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
          status: 'pending',
          quantitySold:'2',
          expectedDeliveryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:'6870c509-23eb-47ed-ae8e-e0c740adba28',
          orderId: 'fb23adef-b2e5-40f1-9066-07644961a0b3',
          productId: 'f471c2c5-e682-4b25-8239-5d0d5c52661b',
          status: 'pending',
          quantitySold:'2',
          expectedDeliveryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '535d1305-f65e-44e5-8b0f-31be187577d5',
          orderId: 'de17c74a-2d71-4c01-9ab8-0f213d23038a',
          productId: '1e9ac7b1-2760-462b-a0f9-28f85867836f',
          status: 'accepted',
          quantitySold: 3,
          expectedDeliveryDate: '2023-03-18',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '27a40bf6-99df-4fa9-8a18-33f40e75ad7f',
          orderId: 'de17c74a-2d71-4c01-9ab8-0f213d23038a',
          productId: '09fcad25-f3d0-4a77-8171-59fd78be01bb',
          status: 'pending',
          quantitySold: 3,
          expectedDeliveryDate: '2023-03-18',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
